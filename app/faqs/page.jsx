import FaqSideBar from "@/components/FaqSidebar";

export default function page() {
  return (
    <>
      <div className="p-6 md:min-h-[400px]">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-center my-2">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-center my-2">
            Can&apos;t find the answer you&apos;re looking for? We&apos;ve
            shared some of our most frequently asked questions to help you out.
          </p>
        </div>
        <FaqSideBar />
      </div>
    </>
  );
}