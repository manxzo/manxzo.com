export async function generateStaticParams() {
    const experienceIDs = ["1", "2", "3"]; // Example static IDs
    return experienceIDs.map((id) => ({ id }));
  }
  
  const ExperiencePage = ({ params }: { params: { id: string } }) => {
    return <div>Experience Page for ID: {params.id}</div>;
  };
  
  export default ExperiencePage;
  