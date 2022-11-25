import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { CardContent, Box, Card, Typography } from '@mui/material';
// utils
import mockData from '../../../utils/mock-data';
//
import { varFadeInRight, MotionContainer } from '../../animate';
import { CarouselControlsPaging1, CarouselControlsArrowsBasic1 } from '../../carousel';

// ----------------------------------------------------------------------

const TITLES = [
  'Nhượng quyền thương mại với KROWD',
  'Cầu nối gắn kết giữa doanh nghiệp và các nhà đầu tư',
  'Nền tảng nhượng quyền thương mại cho doanh nghiệp'
];

const MOCK_APPS = [...Array(3)].map((_, index) => ({
  id: mockData.id(index),
  title: TITLES[index],
  description: mockData.text.title(index),
  image: mockData.image.feed(index)
}));

const CarouselImgStyle = styled('img')(({ theme }) => ({
  height: 280,
  width: '100%',
  objectFit: 'cover',
  [theme.breakpoints.up('xl')]: {
    height: 320
  }
}));

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: {
    image: string;
    title: string;
    description: string;
  };
  isActive?: boolean;
};

function CarouselItem({ item, isActive }: CarouselItemProps) {
  const { image, title, description } = item;

  return (
    <RouterLink to="#">
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            top: 0,
            width: 1,
            height: 1,
            position: 'absolute',
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
          }}
        />
        <CarouselImgStyle alt={title} src={image} />
        <CardContent
          sx={{
            bottom: 0,
            width: 1,
            textAlign: 'left',
            position: 'absolute',
            color: 'common.white'
          }}
        >
          <MotionContainer open={isActive}>
            <motion.div variants={varFadeInRight}>
              <Typography
                variant="overline"
                sx={{
                  mb: 1,
                  opacity: 0.48,
                  display: 'block'
                }}
              >
                Bài viết của Krowd
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
            </motion.div>
            {/* <motion.div variants={varFadeInRight}>
              <Typography variant="body2" noWrap>
                {description}
              </Typography>
            </motion.div> */}
          </MotionContainer>
        </CardContent>
      </Box>
    </RouterLink>
  );
}

export default function KrowdArticle() {
  const theme = useTheme();
  const carouselRef = useRef<Slider>(null);
  const [currentIndex, setCurrentIndex] = useState(
    theme.direction === 'rtl' ? MOCK_APPS.length - 1 : 0
  );

  const settings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current: number, next: number) => setCurrentIndex(next),

    ...CarouselControlsPaging1({
      color: 'primary.main',
      sx: {
        top: theme.spacing(3),
        left: theme.spacing(3),
        bottom: 'auto',
        right: 'auto'
      }
    })
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card>
      <Slider ref={carouselRef} {...settings}>
        {MOCK_APPS.map((app, index) => (
          <CarouselItem key={app.id} item={app} isActive={index === currentIndex} />
        ))}
      </Slider>

      <CarouselControlsArrowsBasic1 onNext={handleNext} onPrevious={handlePrevious} />
    </Card>
  );
}
