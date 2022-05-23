import Layout from "~/layouts/Layout";

export default function Index() {
  return (
    <div className="flex flex-col md:mt-8 md:px-8">
      <p>cool stuff goes here</p>
    </div>
  );
}

Index.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
