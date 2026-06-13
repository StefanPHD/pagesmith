import CodeImporter from "@/components/CodeImporter";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1800px] px-4 py-8 lg:px-8">
      <h1 className="mb-1 text-2xl font-bold text-gray-900">
        Pagesmith
      </h1>
      <p className="mb-8 text-gray-500">
        Mach deinen KI-generierten Code funktional.
      </p>
      <CodeImporter />
    </main>
  );
}