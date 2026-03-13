import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import ProductsChart from "@/components/products-chart";
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
      select: {
        name: true,
        price: true,
        quantity: true,
        createdAt: true,
        lowStockAt: true,
      },
    }),
  ]);

  const totalValue = allProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0,
  );

  // Circle Feature Logic
  const inStockCount = allProducts.filter((p) => Number(p.quantity) > 5).length;
  const lowStockCount = allProducts.filter(
    (p) => Number(p.quantity) <= 5 && Number(p.quantity) >= 1,
  ).length;
  const outOfStockCount = allProducts.filter(
    (p) => Number(p.quantity) === 0,
  ).length;

  const inStockPercentage =
    totalProducts > 0 ? Math.round((inStockCount / totalProducts) * 100) : 0;
  const lowStockPercentage =
    totalProducts > 0 ? Math.round((lowStockCount / totalProducts) * 100) : 0;
  const outStockPercentage =
    totalProducts > 0 ? Math.round((outOfStockCount / totalProducts) * 100) : 0;

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const inStockStroke = (inStockPercentage / 100) * circumference;
  const lowStockStroke = (lowStockPercentage / 100) * circumference;
  const outStockStroke = (outStockPercentage / 100) * circumference;

  // Chart Feature Logic
  const now = new Date();
  const weeklyProducts = [];
  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekStart.setHours(23, 59, 59, 999);
    const weekLabel = `${String(weekStart.getMonth() + 1).padStart(2, "0")}/${String(weekStart.getDate()).padStart(2, "0")}`;
    const weekProductsCount = allProducts.filter((product) => {
      const productDate = new Date(product.createdAt);
      return productDate >= weekStart && productDate <= weekEnd;
    }).length;
    weeklyProducts.push({ week: weekLabel, products: weekProductsCount });
  }

  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="flex">
      <Sidebar currentPath="/dashboard" />
      <main className="flex-1 md:ml-76 p-4 mt-0 md:p-2 ">
        <div className="max-sm:mt-12 mt-5">
          <h1 className="text-2xl text-foreground font-semibold">Dashboard</h1>
          <p className="text-sm text-foreground/60">
            Welcome back ! Here is an overview of your inventory
          </p>
        </div>

        {/* Top Row: Metrics (Left) and Chart (Right) */}
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
              </div>
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
              </div>
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

          <div className="bg-foreground/10 rounded-lg border border-gray-200 px-3 py-6 md:p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              New products per week
            </h2>
            <div className="h-48">
              <ProductsChart data={weeklyProducts} />
            </div>
          </div>
        </div>

        {/* Bottom Row: Stock Levels (Left) and Circle (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-foreground/10 rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Stock levels
            </h2>
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
                      <span className="text-sm font-medium text-foreground">
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

          <div className="bg-foreground/10 rounded-lg border border-gray-200 p-6 flex flex-col ">
            <div className=" flex flex-col items-center justify-center">
              <h2 className="text-lg font-semibold text-foreground self-start mb-6">
                Inventory Health
              </h2>
              <div className="relative w-64 h-64 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="18"
                    fill="transparent"
                    className="text-zinc-300 dark:text-zinc-800"
                  />

                  <circle
                    cx="128"
                    cy="128"
                    r={radius}
                    stroke="#9333ea"
                    strokeWidth="18"
                    fill="transparent"
                    strokeDasharray={`${inStockStroke} ${circumference}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-5xl font-bold text-foreground">
                    {inStockPercentage}%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest">
                    In stock
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col   gap-4">
              <div
                className="flex items-center 
               gap-1.5"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                <span className="text-xs font-bold text-foreground/30">
                  In Stock ({inStockPercentage}% )
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="text-xs font-bold text-foreground/30">
                  Low Stock ({lowStockPercentage}% )
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
                <span className="text-xs font-bold text-foreground/30">
                  Out of Stocck ({outStockPercentage}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
