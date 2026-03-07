import { mockOrder } from "@/lib/navigationData";
import Link from "next/link";
import Image from "next/image";

function getStatusStyle(status: string) {
  switch (status) {
    case "Delivered":
      return "bg-green-50 text-green-700";
    case "In Transit":
      return "bg-blue-50 text-blue-700";
    case "Processing":
      return "bg-yellow-50 text-yellow-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
}

export default function AccountPurchases() {
  return (
    <div>
      <h1 className="text-[18px] md:text-[22px] font-light tracking-[0.2em] uppercase mb-10">
        My Purchases
      </h1>

      {mockOrder.length === 0 ? (
        <div>
          <p></p>
          <Link href="/">
            <button className="w-[200px] py-3 text-white bg-black border border-black uppercase text-[11px] tracking-widest font-light hover:bg-black/80 transition-colors cursor-pointer">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {mockOrder.map((order) => (
            <div key={order.id} className="border border-gray-200">
              {/* contents */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 bg-gray-50">
                <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                  <div>
                    <p className="text-[10px] text-gray-400">Order</p>
                    <p className="text-[12px] tracking-wider mt-1">
                      {order.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-400 tracking-wider uppercase">
                      Date
                    </p>
                    <p className="text-[12px] tracking-wider mt-1">
                      {order.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-400 tracking-wider uppercase">
                      Total
                    </p>
                    <p className="text-[12px] tracking-wider mt-1">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[10px] tracking-wider uppercase px-3 py-1 rounded-full ${getStatusStyle(order.status)}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="divide-y divide-gray-100">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 px-4 sm:px-6 py-4"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={160}
                      height={200}
                      className="flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="text-[12px] tracking-wider uppercase">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-gray-400 tracking-wider mt-5">
                        Size: {item.size} | Color: {item.color} | Qty:{" "}
                        {item.quantity}
                      </p>
                    </div>

                    <p className="text-[12px] tracking-wider">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
