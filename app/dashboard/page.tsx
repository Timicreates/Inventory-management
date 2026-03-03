import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

import Sidebar from "./../../components/sidebar";
import { TrendingUp } from "lucide-react";

const DashboardPage = async () => {
  const user = await getCurrentUser();
  const userId = user.id;

  const [totalProducts, lowStock, allProducts] = await Promise.all([
    prisma.product.count({ where: { userId } }),
    prisma.product.count({
      where: {
        userId,
        lowStockAt: { not: null },
        quantity: { lte: 5 },
      },
    }),
    prisma.product.findMany({
      where: { userId },
      select: { price: true, quantity: true, createdAt: true },
    }),
  ]);

  const totalValue = allProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0,
  );
  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="flex">
      <Sidebar currentPath="/dashboard" />
      <main className="flex-1 md:ml-76 p-4 mt-0 md:p-2 ">
        <div className="">
          <div className="">
            <div className=" max-sm:mt-12 mt-5  ">
              <h1 className="text-2xl text-foreground font-semibold">
                Dashboard
              </h1>
              <p className="text-sm text-foreground/60">
                Welcome back ! Here is an overview of your inventory
              </p>
            </div>
          </div>
        </div>
        {/* key metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 mt-6">
          <div className="bg-foreground/10 rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Key Metrics
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">
                  {totalProducts}
                </div>
                <div className="tex-sm text-foreground/50">Total Products</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    + {totalProducts}
                  </span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>{" "}
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">
                  ${Number(totalValue).toFixed(0)}
                </div>
                <div className="tex-sm text-foreground/50">Total Value</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    ${Number(totalValue).toFixed(0)}
                  </span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>{" "}
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">
                  {lowStock}
                </div>
                <div className="tex-sm text-foreground/50">Low stock</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">+ {lowStock}</span>
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>
            </div>
          </div>
          {/* inventory over time */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* stock section */}

          <div className="bg-foreground/10 rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                Stock levels
              </h2>
            </div>
            <div className="space-y-3">
              {recent.map((product, key) => {
                const stockLevel =
                  product.quantity === 0
                    ? 0
                    : product.quantity <= (product.lowStockAt || 5)
                      ? 1
                      : 2;

                const bgColours = [
                  "bg-red-600",
                  "bg-yellow-600",
                  "bg-green-600",
                ];
                const textColours = [
                  "text-red-600",
                  "text-yellow-600",
                  "text-green-600",
                ];

                return (
                  <div
                    className="flex justify-between items-center p-3 rounded-lg bg-background/20"
                    key={key}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${bgColours[stockLevel]}`}
                      />
                      <span
                        className={`text-sm font-medium text-foreground/30`}
                      >
                        {product.name}
                      </span>
                    </div>
                    <div
                      className={`text-sm font-medium ${textColours[stockLevel]}`}
                    >
                      {product.quantity} Units
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
