
CREATE OR REPLACE FUNCTION public.search_sponsored_products(search_query text)
RETURNS TABLE (
  products json,
  boost_level integer
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    json_build_object(
      'id', p.id,
      'name', p.name,
      'price', p.price,
      'category', p.category,
      'image', p.image,
      'images', p.images,
      'description', p.description,
      'externalSource', p.source,
      'externalUrl', p.affiliate_link,
      'currency', COALESCE(p.shipping_info->>'currency', 'USD')
    ) as products,
    sp.boost_level
  FROM sponsored_products sp
  JOIN products p ON p.id = sp.product_id
  WHERE sp.status = 'active'
  AND (
    p.name ILIKE '%' || search_query || '%' 
    OR p.description ILIKE '%' || search_query || '%'
    OR p.category ILIKE '%' || search_query || '%'
  )
  ORDER BY sp.boost_level DESC;
END;
$$;
