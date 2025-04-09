import { BarGraph } from "@/components/dashboard/bar-chart";
import { HorizontalGraph } from "@/components/dashboard/horizontal-bar-chat";
import { PieGraph } from "@/components/dashboard/pie-chart";
import { RadarGraph } from "@/components/dashboard/radar-chart";
import Summary from "@/components/dashboard/summary";
import { TopCustomers } from "@/components/dashboard/top-customers";
import { TopProducts } from "@/components/dashboard/top-products";
import { fetchTopCustomers } from "@/utils/fetchTopCustomers";

const HomePage = async () => {
  const topCustomers = await fetchTopCustomers();

  return (
    <div className="p-4 grid gap-5">
      <Summary />
      <div className="grid lg:grid-cols-2 gap-10">
        <BarGraph />
        <RadarGraph />
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        <TopProducts />
        <PieGraph />
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        <HorizontalGraph />
        <TopCustomers data={topCustomers} />
      </div>
    </div>
  );
}

export default HomePage;
