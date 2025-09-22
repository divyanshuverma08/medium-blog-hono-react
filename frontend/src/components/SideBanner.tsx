export const SideBanner = () => {
  return (
    <div className="hidden lg:block">
      <div className="h-screen bg-slate-200 flex justify-center items-center flex-col">
        <div className="flex justify-center flex-col gap-4">
          <p className="max-w-lg text-3xl font-bold">
            "The customer service I received was exceptional. The support team
            went above and beyond to address my concerns."
          </p>
          <div className="max-w-md text-left text-xl">
            <p className="font-semibold">Jules Winfield</p>
            <p className="font-normal text-slate-400">CEO, Acme Inc</p>
          </div>
        </div>
      </div>
    </div>
  );
};
