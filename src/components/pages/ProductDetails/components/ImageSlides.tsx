import { useMemo } from 'react';
import { ArrowLeft } from 'iconoir-react';
import {
  AbsoluteContent,
  ChevronLeftIcon, ChevronRightIcon,
  FlexBox,
  IconButton,
  RenderIf, useSimplePagination
} from '@devland-ui/components';
import productsApi from 'api/products';
import { ProductModel } from 'models/product';
import IconoirIcon from 'components/experience/IconoirIcon';
import { Counter, ImageHolder } from '../styled';

interface Props {
  goBack: () => void;
  product: ProductModel;
}

const ImageSlides = (props: Props) => {
  const { product, goBack } = props;
  const {
    page: index,
    goNext: showNext,
    goBack: showPrevious,
  } = useSimplePagination(product?.images?.length, 0);

  const imgUrl = useMemo<URL | undefined>(() => (
    productsApi.fetchPhoto(
      product.bucket,
      product.images[index],
      window.innerWidth,
    )
  ), [ index]);
  return (
    <ImageHolder>
      <AbsoluteContent top={0} left={0} right={0}>
        <FlexBox
          height={80}
          width="100%"
          justify="space-between"
          align="center"
          padding="16px 16px 16px 0"
        >
          <IconButton
            onClick={goBack}
            size="large"
            variant="flat"
            color="font"
            icon={<IconoirIcon icon={ArrowLeft} />}
          />
          <RenderIf condition={product?.images.length > 1}>
            <Counter>{`${index + 1} / ${product?.images.length}`}</Counter>
          </RenderIf>
        </FlexBox>
      </AbsoluteContent>
      <RenderIf condition={product?.images.length > 1}>
        <AbsoluteContent top={window.innerWidth / 2} left={16}>
          <IconButton
            onClick={showPrevious}
            size="large"
            variant="fill"
            color="font"
            icon={<ChevronLeftIcon />}
          />
        </AbsoluteContent>
        <AbsoluteContent top={window.innerWidth / 2} right={16}>
          <IconButton
            onClick={showNext}
            size="large"
            variant="fill"
            color="font"
            icon={<ChevronRightIcon />}
          />
        </AbsoluteContent>
      </RenderIf>
      <img
        src={imgUrl.href}
        height={window.innerWidth}
        width={window.innerWidth}
        alt={product.name}
      />
    </ImageHolder>
  );
};

export default ImageSlides;
