export async function generateStaticParams() {
    const postSlugs = ["1", "2", "3"]; 
    return postSlugs.map((slug) => ({ slug }));
  }
  
  const PostPage = ({ params }: { params: { slug: string } }) => {
    return <div>Post Page for Slug: {params.slug}</div>;
  };

export default PostPage;
