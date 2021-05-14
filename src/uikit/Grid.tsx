import { Flex, Box, FlexProps, BoxProps } from '@rebass/grid/emotion'

export const Row = (props: FlexProps) => <Flex flexWrap="wrap" mx={-3} {...props} />
export const Col = (props: BoxProps) => <Box p={3} {...props} />
