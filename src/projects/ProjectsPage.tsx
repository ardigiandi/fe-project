import Header from "@/components/header";
import FormProject from "./components/FormProject";

const ProjectsPage = () => {
  return (
    <div>
      <Header title="My Project" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border-2 border-dashed rounded-lg shadow-sm hover:shadow-lg transition-all p-5 space-y-5 flex justify-center items-center">
          <FormProject />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
