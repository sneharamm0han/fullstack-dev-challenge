import React from 'react'
import { Slider as MaterialSlider, SliderProps } from '@material-ui/core';
import {
    Text,
    Box,
} from '@chakra-ui/react'

type Props = SliderProps & {
    label?: string
}

const Slider = ({ label, ...rest }: Props) => (
    <Box width="100%">
        {!!label && <Text align="left">{label}</Text>}
        <MaterialSlider {...rest}/>
    </Box>
)

export default Slider
