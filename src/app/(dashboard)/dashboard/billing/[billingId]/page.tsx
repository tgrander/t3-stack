export default async function BillingDetails({
  params,
}: {
  params: { billingId?: string };
}) {
  const { billingId } = params;

  return (
    <div>
      {/* <h1>Billing</h1> */}
      <p>Billing ID: {billingId}</p>
    </div>
  );
}
