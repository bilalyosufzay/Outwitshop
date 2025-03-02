
interface ProductCardInfoProps {
  name: string;
  formattedPrice: string;
  formattedOriginalPrice?: string | null;
}

const ProductCardInfo = ({ name, formattedPrice, formattedOriginalPrice }: ProductCardInfoProps) => {
  return (
    <div className="p-3 flex flex-col flex-1">
      <h3 className="font-medium text-sm line-clamp-2 mb-1">{name}</h3>
      
      <div className="flex items-center mt-auto">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{formattedPrice}</span>
          {formattedOriginalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formattedOriginalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardInfo;
