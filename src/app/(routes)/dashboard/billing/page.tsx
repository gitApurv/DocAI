import { PricingTable } from "@clerk/nextjs";

const Billing = () => {
  return (
    <div className="px-10 md:px-24 lg:px-48">
      <h2 className="text-2xl font-bold mb-4 text-center">Select your plan</h2>
      <PricingTable />
    </div>
  );
};

export default Billing;
