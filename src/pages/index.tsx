function IndexPage() {
  return <></>;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/dashboard/computers',
      permanent: false,
    },
  };
}

export default IndexPage;
