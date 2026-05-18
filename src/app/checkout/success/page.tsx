import { OrderConfirmation } from "@/components/OrderConfirmation";

type CheckoutSuccessPageProps = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const { orderId } = await searchParams;

  return <OrderConfirmation orderId={orderId} />;
}
