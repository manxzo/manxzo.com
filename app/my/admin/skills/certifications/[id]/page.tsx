export async function generateStaticParams() {
    const certificationIDs = ["1", "2", "3"]; 
    return certificationIDs.map((id) => ({ id }));
  }
  
  const CertificationPage = ({ params }: { params: { id: string } }) => {
    return <div>Certification Page for ID: {params.id}</div>;
  };

  export default CertificationPage;
  