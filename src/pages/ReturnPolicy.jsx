import {
  RefreshCcw,
  CheckCircle,
  XCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-14 px-5">
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg p-10">

          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-5">
              <RefreshCcw size={36} />
            </div>

            <h1 className="text-4xl font-bold">
              Return & Refund Policy
            </h1>

            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We want you to shop with confidence. If you're not completely
              satisfied with your purchase, you can request a return according
              to the policy below.
            </p>
          </div>

          {/* Return Window */}

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 flex gap-4">
            <Clock className="text-amber-600 mt-1" />

            <div>
              <h2 className="font-bold text-xl">
                Return Window
              </h2>

              <p className="text-gray-700 mt-2">
                Returns are accepted within
                <span className="font-semibold"> 2 days </span>
                from the date of delivery.
              </p>
            </div>
          </div>

          {/* Eligible */}

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-green-50 rounded-2xl p-6">

              <h2 className="font-bold text-2xl mb-5 flex items-center gap-2">
                <CheckCircle className="text-green-600" />
                Eligible for Return
              </h2>

              <ul className="space-y-4 text-gray-700">

                <li className="flex gap-3">
                  <CheckCircle className="text-green-600 mt-1" size={20}/>
                  Product is unused and unworn.
                </li>

                <li className="flex gap-3">
                  <CheckCircle className="text-green-600 mt-1" size={20}/>
                  Product is in its original condition.
                </li>

                <li className="flex gap-3">
                  <CheckCircle className="text-green-600 mt-1" size={20}/>
                  Original tags are attached.
                </li>

                <li className="flex gap-3">
                  <CheckCircle className="text-green-600 mt-1" size={20}/>
                  Product is returned within 2 days.
                </li>

              </ul>

            </div>

            {/* Not Eligible */}

            <div className="bg-red-50 rounded-2xl p-6">

              <h2 className="font-bold text-2xl mb-5 flex items-center gap-2">
                <XCircle className="text-red-600" />
                Return Not Accepted
              </h2>

              <ul className="space-y-4 text-gray-700">

                <li className="flex gap-3">
                  <XCircle className="text-red-600 mt-1" size={20}/>
                  Used or washed products.
                </li>

                <li className="flex gap-3">
                  <XCircle className="text-red-600 mt-1" size={20}/>
                  Products without original tags.
                </li>

                <li className="flex gap-3">
                  <XCircle className="text-red-600 mt-1" size={20}/>
                  Damaged or altered products.
                </li>

                <li className="flex gap-3">
                  <XCircle className="text-red-600 mt-1" size={20}/>
                  Return requests made after 2 days.
                </li>

              </ul>

            </div>

          </div>

          {/* Refund */}

          <div className="bg-blue-50 rounded-2xl p-7 mt-10">

            <h2 className="text-2xl font-bold flex items-center gap-2">
              <ShieldCheck className="text-blue-600" />
              Refund Process
            </h2>

            <p className="text-gray-700 mt-4 leading-8">
              After receiving your returned product, our quality inspection
              team will verify its condition. If the return meets our policy,
              your refund will be processed to your original payment method.
              Processing time may vary depending on your payment provider.
            </p>

          </div>

          {/* Contact */}

          <div className="border-t mt-12 pt-8 text-center">

            <h2 className="text-2xl font-bold mb-3">
              Need Help?
            </h2>

            <p className="text-gray-600">
              If you have any questions regarding returns or refunds,
              please contact our customer support team.
            </p>

            <div className="mt-5 font-semibold">
              Email: support@desire7clothing.com
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ReturnPolicy;