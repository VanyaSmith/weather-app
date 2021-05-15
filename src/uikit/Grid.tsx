import { Flex, Box, FlexProps } from '@rebass/grid/emotion'

export const Row = (props: FlexProps) => <Flex flexWrap="wrap" mx={[-2, -3, -3, -3]} {...props} />
// export const Col = (props: BoxProps) => <Box p={[2, 3, 3, 3]} {...props} />
export const Col = (props: FlexProps) => <Box p={[2, 3, 3, 3]} {...props} />
