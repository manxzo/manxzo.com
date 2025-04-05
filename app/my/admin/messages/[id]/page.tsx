export async function generateStaticParams() {
    const messageIDs = ["1", "2", "3"]; 
    return messageIDs.map((id) => ({ id }));
  }
  
  const MessagePage = ({ params }: { params: { id: string } }) => {
    return <div>Message Page for ID: {params.id}</div>;
  };
  
  export default MessagePage;