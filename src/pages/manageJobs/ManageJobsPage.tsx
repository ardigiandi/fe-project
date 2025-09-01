import Header from "@/components/header";
import { Link, useParams } from "react-router";
import DetailProjects from "./components/DetailProjects";
import delay from "@/lib/delay";
import apiClient from "@/config/axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import type { Collaborators, Project } from "@/types/type";
import LoadingPage from "@/components/loading-page";
import ListCollaborators from "./components/ListCollaborators";

const ManageJobsPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [collaborators, setCollaborators] = useState<Collaborators[]>([])

  const getProject = async () => {
    try {
      await delay(500);
      const { data } = await apiClient.get(`/projects/${projectId}`);
      setProject(data.project) 
      console.log(data.project)
      setCollaborators(data.project.collaborators)
      setLoading(false)
    } catch (error: any) {
        setLoading(false)
      toast.error(error?.response.data.message );
    }
  };

  const getJobs = async () => {
    try {
        await delay(500)
        const {data} = await apiClient.get(`/jobs/${projectId}/get-jobs`)
        console.log(data)
    } catch (error) {
        console.log(error)
        toast.error("Error getting jobs")
    }
  }

  useEffect(() => {
    getProject()
    getJobs()
  }, [])

  if(loading) return <LoadingPage />

  return (
    <div>
      <Header
        title={"Manage Jobs"}
        children={
          <Link to={`/project`} className="text-sm">
            Back
          </Link>
        }
      />
      <div>
        <DetailProjects project={project} />
        <div className="grid grid-cols-12">
            <ListCollaborators getProject={getProject} collaborators={collaborators}  />
        </div>
      </div> 
    </div>
  );
};

export default ManageJobsPage;
