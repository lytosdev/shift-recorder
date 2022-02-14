import React from 'react'
import { StyleSheet, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, useDerivedValue, runOnJS, withTiming, Easing } from 'react-native-reanimated'
import PropTypes from 'prop-types'

export default function Swiper({ dataA, dataB, dataC, onIndexChanged, height, width }) {

    const translateA = useSharedValue(0)
    const translateB = useDerivedValue(() => width)
    const translateC = useDerivedValue(() => width * 2)
    const translateContainer = useDerivedValue(() => -width)

    const lastIndex = useSharedValue(-1)
    const currentIndex = useSharedValue(1)
    const inAnimation = useSharedValue(false)

    const slidePercent = 45
    const speedLimit = 300

    const marginToSnap = marginPercent => {
        "worklet"
        return width * marginPercent / 100
    }

    const looping = () => {
        "worklet"
        if (translateContainer.value === -width * 2) {
            if (translateA.value === 0) {
                translateA.value = width * 2
                translateB.value = 0
                translateC.value = width
                translateContainer.value = -width
            } else if (translateB.value === 0) {
                translateA.value = width
                translateB.value = width * 2
                translateC.value = 0
                translateContainer.value = -width
            } else if (translateC.value === 0) {
                translateA.value = 0
                translateB.value = width
                translateC.value = width * 2
                translateContainer.value = -width
            }
        } else if (translateContainer.value === 0) {
            if (translateA.value === width * 2) {
                translateA.value = 0
                translateB.value = width
                translateC.value = width * 2
                translateContainer.value = -width
            } else if (translateB.value === width * 2) {
                translateA.value = width * 2
                translateB.value = 0
                translateC.value = width
                translateContainer.value = -width
            } else if (translateC.value === width * 2) {
                translateA.value = width
                translateB.value = width * 2
                translateC.value = 0
                translateContainer.value = -width
            }
        }
        inAnimation.value = false
    }

    const indexChanged = newIndex => {
        "worklet"
        lastIndex.value = currentIndex.value
        currentIndex.value = newIndex
        runOnJS(onIndexChanged)(lastIndex.value, currentIndex.value)
    }
    const setIndex = marginToSnap => {
        "worklet"
        if (translateContainer.value < -width - marginToSnap) {
            if (translateA.value === width * 2) {
                if (currentIndex.value !== 0) {
                    indexChanged(0)
                }
            } else if (translateB.value === width * 2) {
                if (currentIndex.value !== 1) {
                    indexChanged(1)
                }
            } else if (translateC.value === width * 2) {
                if (currentIndex.value !== 2) {
                    indexChanged(2)
                }
            }
        } else if (translateContainer.value > -width + marginToSnap) {
            if (translateA.value === 0) {
                if (currentIndex.value !== 0) {
                    indexChanged(0)
                }
            } else if (translateB.value === 0) {
                if (currentIndex.value !== 1) {
                    indexChanged(1)
                }
            } else if (translateC.value === 0) {
                if (currentIndex.value !== 2) {
                    indexChanged(2)
                }
            }
        } else {
            if (translateA.value === width) {
                if (currentIndex.value !== 0) {
                    indexChanged(0)
                }
            } else if (translateB.value === width) {
                if (currentIndex.value !== 1) {
                    indexChanged(1)
                }
            } else if (translateC.value === width) {
                if (currentIndex.value !== 2) {
                    indexChanged(2)
                }
            }
        }
    }

    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (_event, ctx) => {
            if (inAnimation.value) return
            ctx.x = translateContainer.value
        },
        onActive: ({ translationX, velocityX }, ctx) => {
            if (inAnimation.value) return
            translateContainer.value = translationX + ctx.x
            if (velocityX >= -speedLimit && velocityX <= speedLimit)
                setIndex(marginToSnap(slidePercent))
        },
        onEnd: ({ translationX, velocityX }) => {
            if (inAnimation.value) return
            inAnimation.value = true

            const easing = Easing.linear
            const duration = 150

            if (translationX < 0) {
                if (velocityX < -speedLimit) {
                    setIndex(marginToSnap(0))
                    translateContainer.value = withTiming(-width * 2, { duration, easing }, looping)
                } else {
                    if (translateContainer.value < -width - marginToSnap(slidePercent)) {
                        translateContainer.value = withTiming(-width * 2, { duration, easing }, looping)
                    } else {
                        translateContainer.value = withTiming(-width, { duration, easing }, looping)
                    }
                }
            } else if (translationX > 0) {
                if (velocityX > speedLimit) {
                    setIndex(marginToSnap(0))
                    translateContainer.value = withTiming(0, { duration, easing }, looping)
                } else {
                    if (translateContainer.value > -width + marginToSnap(slidePercent)) {
                        translateContainer.value = withTiming(0, { duration, easing }, looping)
                    } else {
                        translateContainer.value = withTiming(-width, { duration, easing }, looping)
                    }
                }
            }

        }
    })

    const animatedStyleContainer = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateContainer.value }]
        }
    })
    const animatedStyleA = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateA.value }]
        }
    })
    const animatedStyleB = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateB.value }]
        }
    })
    const animatedStyleC = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateC.value }]
        }
    })

    return (
        <View style={[styles.container, { height, width }]}>

            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[animatedStyleContainer, { height, width: width * 3 }]}>

                    <Animated.View style={[animatedStyleA, { ...StyleSheet.absoluteFill, width }]}>
                        {dataA}
                    </Animated.View>
                    <Animated.View style={[animatedStyleB, { ...StyleSheet.absoluteFill, width }]}>
                        {dataB}
                    </Animated.View>
                    <Animated.View style={[animatedStyleC, { ...StyleSheet.absoluteFill, width }]}>
                        {dataC}
                    </Animated.View>

                </Animated.View>
            </PanGestureHandler>

        </View >
    )
}

const styles = StyleSheet.create({

    container: {

    }

})

Swiper.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
}