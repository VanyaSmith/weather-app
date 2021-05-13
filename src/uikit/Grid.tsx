import React from 'react'
import { Flex, Box, FlexProps, BoxProps } from '@rebass/grid/emotion'

export const Row: React.FC<FlexProps> = (props) => <Flex flexWrap="wrap" mx={-3} {...props} />
export const Col: React.FC<BoxProps> = (props) => <Box p={3} {...props} />
