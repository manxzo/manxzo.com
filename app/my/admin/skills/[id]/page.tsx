export async function generateStaticParams() {
    const skillIDs = ["1", "2", "3"]; 
    return skillIDs.map((id) => ({ id }));
  }
  
  const SkillPage = ({ params }: { params: { id: string } }) => {
    return <div>Skill Page for ID: {params.id}</div>;
  };

  export default SkillPage;
  