import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid'
import { Flex, Box, FlexProps, BoxProps } from '@rebass/grid/emotion'

const shouldForwardProp = (prop: PropertyKey) => isPropValid(prop) && prop !== 'width'

const ClearBox = styled(Box, { shouldForwardProp })``
const ClearFlex = styled(Flex, { shouldForwardProp })``

export const Row = (props: FlexProps) => <Flex flexWrap="wrap" mx={-3} {...props} />
export const Col = (props: BoxProps) => <ClearBox p={3} {...props} />
export const ColFlex = (props: FlexProps) => <ClearFlex p={3} {...props} />
