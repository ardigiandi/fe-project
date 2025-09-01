interface NoDataPageProps {
    text?: string
}


const NoDataPage = ({text}: NoDataPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
        <img src="/images/nodata.png" alt="" className="w-56 object-center" />
        <p className="pl-10">{!text ? 'No Data Found' : text}</p>
    </div>
  )
}

export default NoDataPage