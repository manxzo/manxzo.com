
export async function generateStaticParams() {
    const projectIDs = ["1", "2", "3"]; 
    return projectIDs.map((id) => ({ id }));
  }
  
  const ProjectPage = ({ params }: { params: { id: string } }) => {
    return <div>Project Page for ID: {params.id}</div>;
  };

export default ProjectPage;
