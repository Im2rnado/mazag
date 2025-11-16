import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export type QuestionType = 'single' | 'multi' | 'slider';

export type QuestionOption = {
    value: string;
    label: string;
    icon?: keyof typeof Ionicons.glyphMap;
};

export type QuestionData = {
    id: string;
    question: string;
    type: QuestionType;
    options?: QuestionOption[];
    sliderMin?: number;
    sliderMax?: number;
    sliderStep?: number;
    required?: boolean;
};

type QuestionCardProps = {
    question: QuestionData;
    value: any;
    onChange: (value: any) => void;
    onSkip?: () => void;
};

export default function QuestionCard({ question, value, onChange, onSkip }: QuestionCardProps) {
    const [showSkipModal, setShowSkipModal] = useState(false);

    const handleSkip = () => {
        if (question.required) {
            setShowSkipModal(true);
        } else {
            onSkip?.();
        }
    };

    const confirmSkip = () => {
        setShowSkipModal(false);
        onSkip?.();
    };

    const renderSingleChoice = () => (
        <View className="gap-3">
            {question.options?.map((option) => {
                const isSelected = value === option.value;
                return (
                    <TouchableOpacity
                        key={option.value}
                        activeOpacity={0.7}
                        onPress={() => onChange(option.value)}
                        className="flex-row items-center p-4 rounded-2xl border-2"
                        style={{
                            borderColor: isSelected ? '#2196F3' : '#E3F2FD',
                            backgroundColor: isSelected ? '#2196F3' : '#FAFAFA',
                        }}
                    >
                        {option.icon && (
                            <Ionicons
                                name={option.icon}
                                size={20}
                                color={isSelected ? '#fff' : '#2196F3'}
                                style={{ marginRight: 12 }}
                            />
                        )}
                        <Text
                            className="flex-1 text-base font-avenir-semibold"
                            style={{ color: isSelected ? '#fff' : '#424242' }}
                        >
                            {option.label}
                        </Text>
                        {isSelected && (
                            <Ionicons name="checkmark-circle" size={20} color="#fff" />
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );

    const renderMultiChoice = () => {
        const selectedValues = Array.isArray(value) ? value : [];

        return (
            <View className="gap-3">
                {question.options?.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                        <TouchableOpacity
                            key={option.value}
                            activeOpacity={0.7}
                            onPress={() => {
                                if (isSelected) {
                                    onChange(selectedValues.filter(v => v !== option.value));
                                } else {
                                    onChange([...selectedValues, option.value]);
                                }
                            }}
                            className="flex-row items-center p-4 rounded-2xl border-2"
                            style={{
                                borderColor: isSelected ? '#2196F3' : '#E3F2FD',
                                backgroundColor: isSelected ? '#2196F3' : '#FAFAFA',
                            }}
                        >
                            {option.icon && (
                                <Ionicons
                                    name={option.icon}
                                    size={20}
                                    color={isSelected ? '#fff' : '#2196F3'}
                                    style={{ marginRight: 12 }}
                                />
                            )}
                            <Text
                                className="flex-1 text-base font-avenir-semibold"
                                style={{ color: isSelected ? '#fff' : '#424242' }}
                            >
                                {option.label}
                            </Text>
                            {isSelected && (
                                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const renderSlider = () => {
        const sliderValue = typeof value === 'number' ? value : (question.sliderMin || 1);

        return (
            <View className="py-2">
                <View className="items-center mb-6">
                    <Text className="text-5xl font-avenir-bold text-primaryBlue">
                        {sliderValue}
                    </Text>
                    <Text className="text-lg font-avenir-semibold text-[#64B5F6] mt-2">
                        {sliderValue <= 3 ? 'Low' : sliderValue <= 7 ? 'Moderate' : 'High'}
                    </Text>
                </View>
                <Slider
                    className="w-full h-10"
                    minimumValue={question.sliderMin || 1}
                    maximumValue={question.sliderMax || 10}
                    step={question.sliderStep || 1}
                    value={sliderValue}
                    onValueChange={onChange}
                    minimumTrackTintColor="#2196F3"
                    maximumTrackTintColor="#E3F2FD"
                    thumbTintColor="#1976D2"
                />
                <View className="flex-row justify-between mt-2">
                    <Text className="text-sm text-textLight font-avenir-semibold">
                        {question.sliderMin || 1}
                    </Text>
                    <Text className="text-sm text-textLight font-avenir-semibold">
                        {question.sliderMax || 10}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <Animated.View
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(200)}
            className="flex-1 p-5"
        >
            <View
                className="bg-white rounded-3xl p-6"
                style={{
                    shadowColor: '#2196F3',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    elevation: 5,
                }}
            >
                <Text className="text-[22px] font-avenir-bold text-[#1976D2] mb-6 leading-8">
                    {question.question}
                </Text>

                {question.type === 'single' && renderSingleChoice()}
                {question.type === 'multi' && renderMultiChoice()}
                {question.type === 'slider' && renderSlider()}

                {onSkip && (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleSkip}
                        className="mt-5 p-3 items-center"
                    >
                        <Text className="text-[15px] text-textLight font-avenir-semibold">
                            Skip this question
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Skip Confirmation Modal */}
            <Modal
                visible={showSkipModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowSkipModal(false)}
            >
                <View className="flex-1 bg-black/50 justify-center items-center p-5">
                    <View className="bg-white rounded-3xl p-7 w-full max-w-[400px] items-center">
                        <Ionicons name="alert-circle-outline" size={48} color="#FF9800" />
                        <Text className="text-[22px] font-avenir-bold text-[#1976D2] mt-4 mb-3">
                            Skip Required Question?
                        </Text>
                        <Text className="text-base text-textStrong text-center leading-6 mb-6">
                            This question helps us personalize your experience. Are you sure you want to skip it?
                        </Text>
                        <View className="flex-row gap-3 w-full">
                            <TouchableOpacity
                                onPress={() => setShowSkipModal(false)}
                                className="flex-1 p-3.5 rounded-2xl items-center bg-[#F5F5F5]"
                            >
                                <Text className="text-base font-avenir-bold text-textStrong">
                                    Go Back
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={confirmSkip}
                                className="flex-1 p-3.5 rounded-2xl items-center bg-[#FF9800]"
                            >
                                <Text className="text-base font-avenir-bold text-white">
                                    Skip Anyway
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </Animated.View>
    );
}
