import ProductsList from "./productList";

export default async function Products({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const categoryId = searchParams?.category;

  const apiUrl = categoryId
    ? `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
    : `https://ecommerce.routemisr.com/api/v1/products`;

  const response = await fetch(apiUrl, {
    next: { revalidate: 10 * 60 },
  });

  const { data: products } = await response.json();

  return <ProductsList products={products} />;
}
