import {
  FileText,
  ShoppingBag,
  CreditCard,
  Shield,
  AlertTriangle,
  Scale,
} from "lucide-react";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-14 px-5">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10">

        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-5">
            <FileText size={36} />
          </div>

          <h1 className="text-4xl font-bold">
            Terms & Conditions
          </h1>

          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            Welcome to Desire7 Clothing. By accessing or using our website,
            you agree to comply with the following Terms & Conditions.
            Please read them carefully before placing an order.
          </p>
        </div>

        {/* Orders */}

        <div className="bg-gray-50 rounded-2xl p-6 mb-6">

          <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
            <ShoppingBag className="text-black" />
            Orders
          </h2>

          <ul className="space-y-3 text-gray-700">
            <li>• All orders are subject to product availability.</li>
            <li>• We reserve the right to cancel any order if the product becomes unavailable.</li>
            <li>• Product images are for reference. Minor color variations may occur due to lighting or display settings.</li>
          </ul>

        </div>

        {/* Pricing */}

        <div className="bg-gray-50 rounded-2xl p-6 mb-6">

          <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
            <CreditCard className="text-black" />
            Pricing & Payments
          </h2>

          <ul className="space-y-3 text-gray-700">
            <li>• All prices are displayed in Indian Rupees (INR).</li>
            <li>• Prices may change without prior notice.</li>
            <li>• Orders will be processed only after successful payment confirmation.</li>
          </ul>

        </div>

        {/* Returns */}

        <div className="bg-gray-50 rounded-2xl p-6 mb-6">

          <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
            <Shield className="text-black" />
            Returns & Refunds
          </h2>

          <ul className="space-y-3 text-gray-700">
            <li>• Returns are accepted within <strong>2 days</strong> of delivery.</li>
            <li>• Products must be unused, unwashed, and in their original condition.</li>
            <li>• Original tags must remain attached.</li>
            <li>• Damaged, used, or altered products are not eligible for return.</li>
          </ul>

        </div>

        {/* User Responsibilities */}

        <div className="bg-gray-50 rounded-2xl p-6 mb-6">

          <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
            <AlertTriangle className="text-black" />
            Customer Responsibilities
          </h2>

          <ul className="space-y-3 text-gray-700">
            <li>• Provide accurate shipping and contact information.</li>
            <li>• Do not misuse or attempt to disrupt the website.</li>
            <li>• Do not use our content or images without permission.</li>
          </ul>

        </div>

        {/* Liability */}

        <div className="bg-gray-50 rounded-2xl p-6">

          <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
            <Scale className="text-black" />
            Limitation of Liability
          </h2>

          <p className="text-gray-700 leading-8">
            Desire7 Clothing shall not be responsible for indirect,
            incidental, or consequential damages arising from the use of
            our website or products. Our liability is limited to the value
            of the purchased product as permitted by applicable law.
          </p>

        </div>

        <div className="border-t mt-12 pt-8 text-center">

          <h2 className="text-2xl font-bold mb-3">
            Contact Us
          </h2>

          <p className="text-gray-600">
            For questions regarding these Terms & Conditions, please contact
            our customer support team.
          </p>

          <div className="mt-5 font-semibold">
            🌐 www.desire7clothing.com
          </div>

        </div>

      </div>
    </div>
  );
};

export default TermsConditions;