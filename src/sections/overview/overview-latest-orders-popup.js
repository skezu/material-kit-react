import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    SvgIcon,
    TextField,
    Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import Map from '../../components/Maps';

import React, { useState } from 'react';

const statusMap = {
    cours: 'warning',
    traité: 'success',
    attente: 'error'
};

const ProductPage = (props) => {
    // Retrieve the product details from props
    const { product, onClose, onValidate } = props;

    const [imWidth, setImWidth] = useState(0);
    const [imHeight, setImHeight] = useState(0);
    function getImageSize(imageUrl) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            resolve({ width: img.width, height: img.height });
          };
          img.onerror = (err) => {
            reject(err);
          };
          img.src = imageUrl;
        });
      }
      
      const imagePath = '/assets/trash-img/1.jpg';
      getImageSize(imagePath)
        .then((size) => {
          setImWidth(size.width);
          setImHeight(size.height);
          console.log(`The image at ${imagePath} is ${size.width}x${size.height}`);
        })
        .catch((err) => {
          console.error(`Error loading image: ${err}`);
        });
      

    const [showImage, setShowImage] = useState(false);

    const boundingBox = product.predictions.map((box, index) => {
        // Original image dimensions
const originalWidth = 346;
const originalHeight = 616;

// Resized image dimensions
const resizedWidth = 200;
const resizedHeight = 300;

// Current image dimensions
const currentWidth = 150;
const currentHeight = 225;

// Current position of rectangle based on original image dimensions
const originalX = 1029.7685546875;
const originalY = 1070.0174560546875;

// Calculate the scaling factor
const scaleFactorX = resizedWidth / originalWidth;
const scaleFactorY = resizedHeight / originalHeight;

// Apply the scaling factor to the x and y coordinates
const currentX = originalX * scaleFactorX;
const currentY = originalY * scaleFactorY;

// Ensure that the x and y coordinates fit within the bounds of the current image
//const x = Math.min(currentX, currentWidth);
//const y = Math.min(currentY, currentHeight);



        const x = (box[1][0]) * 0.074; //(400 /imWidth ); // - 0.5 * (box[1][2] - box[1][0]) * (400 / imWidth);
        const y = (box[1][1]) * 0.074; //(300 /imHeight ); // - 0.5 * (box[1][3] - box[1][1]) * (300 / imHeight);
        const width = (box[1][2] - box[1][0]) * 0.074; //(400 / imWidth);
        const height = (box[1][3] - box[1][1]) * 0.074; //(300 / imHeight);

        return (
            
            <div
                key={index}
                style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    border: '3px solid #0000ff',
                }}
            >
                <Typography variant="body2" color="text.secondary" 
                sx={{ 
                    display: 'flex', 
                    color: '#fff', 
                    textAlign: 'start',
                    width: '100px',
                    fontSize: 11, 
                    position: 'absolute', 
                    bottom: -20, 
                    left: -4, 
                    backgroundColor: 'blue'
                    
                    }}>
                    {box[0]}
                </Typography>
                {/*
                <Typography variant="body2" color="text.secondary">
                    {imWidth} x {imHeight} - {box[1][0]} x {box[1][1]} : {box[1][2]} x {box[1][3]}
                </Typography>*/}
            </div>
        );
    });



    return (
        // Render the product details
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', /* Semi-transparent black background */
            zIndex: 9999, /* Higher z-index to ensure it appears on top of other elements */
        }}>

            <Card sx={{ p: 3, width: '75%' }}>
                <CardHeader title="Ticket"
                    action={
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={onClose}
                            color='error'
                        >
                            x
                        </Button>
                    } />

                <CardContent>

                    <Box display="flex" flexDirection="row">
                        <Box flexGrow={1}>
                            <Typography variant="h6">{product.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                ID: {product.id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Ref: {product.ref}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Date: {format(product.createdAt, 'dd/MM/yyyy')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Nom: {product.customer.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Status: {<SeverityPill color={statusMap[product.status]}>
                                    {product.status}
                                </SeverityPill>}
                            </Typography>
                            <br />
                            <Typography variant="body2" color="text.secondary">
                                Message: {product.message}
                            </Typography>
                            <Button onClick={() => setShowImage(!showImage)} variant="outlined" color="primary" sx={{ mt: 2 }} startIcon={<ArrowRightIcon />}>{showImage ? 'Cacher la carte' : 'Afficher la carte'}</Button>
                            {showImage && (
                                <Box width={'400px'} height={'50px'} style={{
                                    position: 'fixed',
                                    top: '50%',
                                    left: '40%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)', /* Semi-transparent black background */
                                    zIndex: 9999, /* Higher z-index to ensure it appears on top of other elements */
                                }}>
                                    <Map />
                                </Box>
                            )}

                        </Box>
                        <Box position="relative" sx={{ borderRadius: 1, height: 300 }}>
                            {product.image ? (
                                <Box
                                    component="img"
                                    src={product.image}
                                    sx={{
                                        borderRadius: 1,
                                        height: '100%',
                                        width: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        borderRadius: 1,
                                        backgroundColor: 'neutral.200',
                                        height: '100%',
                                        width: '100%',
                                    }}
                                />
                            )}
                            {boundingBox}
                        </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" color="text.primary">
                        Valider le ticket
                    </Typography>
                    <TextField id="time" type="text" multiline={true} placeholder='Ajouter un détail au ticket' sx={{ m: 2, mb: 0, height: '40px' }} />
                    <Button {...product.status == 'traité' ? { disabled: true } : { disabled: false }} variant="contained" color="primary" sx={{ mt: 2 }} onClick={onValidate}>
                        Valider
                    </Button>
                </CardContent>

            </Card>
        </div>
    );
};

export default ProductPage;
