"use client";
import Image from "next/image";
import UserOverviewChart from "@/components/dashboard/UserOverviewChart";
import EarningOverviewChart from "@/components/dashboard/EarningOverviewChart";
import { companies, dashboardStats } from "@/data/data";
import SimpleTable from "@/components/dashboard/SimpleTable";

export default function Home() {
  return (
    <div className="md:h-[calc(100vh-110px)] overflow-y-auto scrl-hide flex flex-col gap-4">
      {/* Top Info  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((item) => (
          <div
            key={item.id}
            className="flex pl-5 items-center gap-2 bg-white border border-gray-300 rounded-xl py-4 w-full"
          >
            <div
              className="rounded-full w-16 h-16 flex justify-center items-center"
              style={{ backgroundColor: item.iconBgColor }}
            >
              <Image
                src={item.iconSrc}
                width={20}
                height={20}
                alt={item.label}
              />
            </div>
            <div>
              <p className="text-2xl font-medium">{item.value}</p>
              <h3 className="text-sm ">{item.label}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Info */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        <UserOverviewChart />
        <EarningOverviewChart />
      </div>

      {/* Bottom info  */}
      <div className="rounded-lg shadow-sm p-3 overflow-auto scrl-hide bg-white ">
        <h2 className="mb-3 text-sm">Recent Companies</h2>
        <div className="overflow-y-auto scrl-hide rounded-md border overflow-hidden border-gray-200">
          <SimpleTable companies={companies} />
        </div>
      </div>
    </div>
  );
}
