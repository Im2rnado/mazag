import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Modal, Animated, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import TherapistService from '@/services/TherapistService';
import { Therapist } from '@/types';

export default function TherapistDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [therapist, setTherapist] = useState<Therapist | null>(null);
    const [loading, setLoading] = useState(true);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [bookingStep, setBookingStep] = useState<'slots' | 'payment' | 'success'>('slots');
    const [fadeAnim] = useState(new Animated.Value(0));

    // Mock payment details (in real app, this would come from user profile or input)
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const list = await TherapistService.fetchAll();
                const found = list.find(t => t.id === id);
                setTherapist((found as Therapist) || null);
            } catch (error) {
                console.error('Failed to load therapist:', error);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    useEffect(() => {
        if (therapist) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [therapist]);

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return {
            day: dayNames[date.getDay()],
            date: date.getDate(),
            month: monthNames[date.getMonth()],
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        };
    };

    const handleBooking = () => {
        setShowBookingModal(true);
        setBookingStep('slots');
        setSelectedSlot(null);
        setPaymentMethod(null);
    };

    const handleSlotSelection = (slot: string) => {
        setSelectedSlot(slot);
    };

    const handleContinueToPayment = () => {
        if (selectedSlot) {
            setBookingStep('payment');
        }
    };

    const handlePayment = () => {
        if (paymentMethod) {
            // Simulate payment processing
            setTimeout(() => {
                setBookingStep('success');
            }, 1000);
        }
    };

    const handleCloseModal = () => {
        setShowBookingModal(false);
        if (bookingStep === 'success') {
            router.push('/therapists');
        }
    };

    if (loading) {
        return (
            <ExpoLinearGradient
                colors={['#FFFFFF', '#E3F2FD', '#B3E5FC']}
                style={{ flex: 1 }}
                locations={[0, 0.7, 1]}
            >
                <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                    <View className="flex-1 justify-center items-center">
                        <Ionicons name="person" size={64} color="#64B5F6" />
                        <Text className="text-lg font-avenir-semibold text-textStrong mt-4">
                            Loading...
                        </Text>
                    </View>
                </SafeAreaView>
            </ExpoLinearGradient>
        );
    }

    if (!therapist) {
        return (
            <ExpoLinearGradient
                colors={['#FFFFFF', '#E3F2FD', '#B3E5FC']}
                style={{ flex: 1 }}
                locations={[0, 0.7, 1]}
            >
                <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                    <View className="flex-1 justify-center items-center px-6">
                        <Ionicons name="alert-circle" size={64} color="#EF5350" />
                        <Text className="text-heading font-avenir-bold text-textStrong mt-4 text-center">
                            Therapist not found
                        </Text>
                        <Pressable
                            onPress={() => router.back()}
                            className="bg-buttonPrimary rounded-2xl px-6 py-3 mt-6"
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.7 : 1,
                            })}
                        >
                            <Text className="text-subheading font-avenir-bold text-white">
                                Go Back
                            </Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </ExpoLinearGradient>
        );
    }

    const fullName = therapist.title ? `${therapist.title} ${therapist.name}` : therapist.name;

    return (
        <ExpoLinearGradient
            colors={['#FFFFFF', '#E3F2FD', '#B3E5FC']}
            style={{ flex: 1 }}
            locations={[0, 0.7, 1]}
        >
            <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                {/* Header */}
                <View className="px-6 py-3 flex-row items-center justify-between">
                    <TouchableOpacity
                        onPress={() => router.push('/therapists')}
                        activeOpacity={0.7}
                        className="w-14 h-14 rounded-full justify-center items-center border"
                        style={{
                            backgroundColor: 'rgba(33, 150, 243, 0.1)',
                            borderWidth: 1.5,
                            borderColor: 'rgba(33, 150, 243, 0.2)',
                        }}
                    >
                        <Ionicons name="arrow-back" size={24} color="#2196F3" />
                    </TouchableOpacity>
                    <Text className="text-heading font-avenir-bold text-textStrong">
                        Therapist Profile
                    </Text>
                    <View className="w-12" />
                </View>

                <Animated.ScrollView
                    style={{ opacity: fadeAnim }}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Profile Card */}
                    <View className="px-6 py-4">
                        <View className="bg-glassBg rounded-3xl p-6 border border-glassBorder" style={{
                            shadowColor: '#2196F3',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 16,
                            elevation: 8,
                        }}>
                            {/* Avatar Placeholder */}
                            <View className="items-center mb-4">
                                <View className="w-24 h-24 rounded-full items-center justify-center" style={{
                                    backgroundColor: therapist.gender === 'Female' ? '#F8BBD0' : '#BBDEFB',
                                    borderWidth: 3,
                                    borderColor: therapist.gender === 'Female' ? '#EC407A' : '#42A5F5',
                                }}>
                                    <Ionicons
                                        name="person"
                                        size={48}
                                        color={therapist.gender === 'Female' ? '#EC407A' : '#42A5F5'}
                                    />
                                </View>
                            </View>

                            {/* Name & Title */}
                            <Text className="text-heading-main font-avenir-bold text-textStrong text-center">
                                {fullName}
                            </Text>
                            <Text className="text-subheading font-avenir-semibold text-primaryBlue text-center mt-1">
                                {therapist.specialization}
                            </Text>

                            {/* Rating & Experience */}
                            <View className="flex-row items-center justify-center gap-4 mt-4">
                                {therapist.rating && (
                                    <View className="flex-row items-center bg-white rounded-xl px-3 py-2">
                                        <Ionicons name="star" size={18} color="#FFA726" />
                                        <Text className="text-base font-avenir-bold text-textStrong ml-1">
                                            {therapist.rating.toFixed(1)}
                                        </Text>
                                        {therapist.reviewCount && (
                                            <Text className="text-xs font-avenir text-textLight ml-1">
                                                ({therapist.reviewCount} reviews)
                                            </Text>
                                        )}
                                    </View>
                                )}
                                {therapist.yearsOfExperience && (
                                    <View className="flex-row items-center bg-white rounded-xl px-3 py-2">
                                        <Ionicons name="briefcase" size={18} color="#64B5F6" />
                                        <Text className="text-base font-avenir-bold text-textStrong ml-1">
                                            {therapist.yearsOfExperience}+ years
                                        </Text>
                                    </View>
                                )}
                            </View>

                            {/* Quick Info Tags */}
                            <View className="flex-row flex-wrap justify-center gap-2 mt-4">
                                {therapist.languages && therapist.languages.map(lang => (
                                    <View key={lang} className="bg-iceBlue rounded-lg px-3 py-1">
                                        <Text className="text-xs font-avenir-medium text-primaryBlue">
                                            {lang}
                                        </Text>
                                    </View>
                                ))}
                                <View className="bg-iceBlue rounded-lg px-3 py-1">
                                    <Text className="text-xs font-avenir-medium text-primaryBlue">
                                        {therapist.gender}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* About Section */}
                    {therapist.bio && (
                        <View className="px-6 py-2">
                            <Text className="text-heading font-avenir-bold text-textStrong mb-3">
                                About
                            </Text>
                            <View className="bg-glassBg rounded-2xl p-4 border border-glassBorder">
                                <Text className="text-subheading font-avenir text-textBody leading-6">
                                    {therapist.bio}
                                </Text>
                            </View>
                        </View>
                    )}

                    {/* Approach Section */}
                    {therapist.approach && (
                        <View className="px-6 py-2">
                            <Text className="text-heading font-avenir-bold text-textStrong mb-3">
                                Therapeutic Approach
                            </Text>
                            <View className="bg-glassBg rounded-2xl p-4 border border-glassBorder">
                                <Text className="text-subheading font-avenir text-textBody leading-6">
                                    {therapist.approach}
                                </Text>
                            </View>
                        </View>
                    )}

                    {/* Qualifications Section */}
                    {therapist.qualifications && therapist.qualifications.length > 0 && (
                        <View className="px-6 py-2">
                            <Text className="text-heading font-avenir-bold text-textStrong mb-3">
                                Qualifications
                            </Text>
                            <View className="bg-glassBg rounded-2xl p-4 border border-glassBorder">
                                {therapist.qualifications.map((qual, index) => (
                                    <View key={index} className="flex-row items-start mb-2">
                                        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                                        <Text className="text-subheading font-avenir text-textStrong ml-2 flex-1">
                                            {qual}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Age Groups Section */}
                    {therapist.ageGroups && therapist.ageGroups.length > 0 && (
                        <View className="px-6 py-2">
                            <Text className="text-heading font-avenir-bold text-textStrong mb-3">
                                Works With
                            </Text>
                            <View className="flex-row flex-wrap gap-2">
                                {therapist.ageGroups.map(age => (
                                    <View key={age} className="bg-glassBg rounded-xl px-4 py-2 border border-glassBorder">
                                        <Text className="text-sm font-avenir-medium text-textStrong">
                                            {age}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Pricing Section */}
                    <View className="px-6 py-2">
                        <View className="bg-glassBg rounded-2xl p-5 border border-glassBorder flex-row items-center justify-between">
                            <View>
                                <Text className="text-sm font-avenir text-textLight">
                                    Session Price
                                </Text>
                                <Text className="text-heading-main font-avenir-bold text-primaryBlue mt-1">
                                    EGP {therapist.price}
                                </Text>
                                <Text className="text-xs font-avenir text-textLight mt-1">
                                    60-minute session
                                </Text>
                            </View>
                            <Ionicons name="card" size={48} color="#64B5F6" />
                        </View>
                    </View>
                </Animated.ScrollView>

                {/* Floating Book Button */}
                <View className="absolute bottom-0 left-0 right-0 px-6 pb-6" style={{
                    backgroundColor: 'transparent',
                    paddingTop: 16,
                }}>
                    <View style={{
                        borderRadius: 24,
                        shadowColor: '#2196F3',
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.8,
                        shadowRadius: 24,
                        elevation: 16,
                    }}>
                        <ExpoLinearGradient
                            colors={['#42A5F5', '#1976D2', '#0D47A1']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                                borderRadius: 24,
                            }}
                        >
                            <Pressable
                                onPress={handleBooking}
                                className="py-5 flex-row items-center justify-center"
                                style={({ pressed }) => ({
                                    opacity: pressed ? 0.85 : 1,
                                })}
                            >
                                <MaterialCommunityIcons name="calendar-clock" size={26} color="#FFFFFF" />
                                <Text className="text-heading font-avenir-bold text-white ml-3">
                                    Book Session
                                </Text>
                            </Pressable>
                        </ExpoLinearGradient>
                    </View>
                </View>

                {/* Booking Modal */}
                <Modal
                    visible={showBookingModal}
                    animationType="slide"
                    transparent={false}
                    onRequestClose={handleCloseModal}
                    presentationStyle="pageSheet"
                >
                    <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View className="bg-white" style={{
                            maxHeight: '80%',
                            borderTopLeftRadius: 32,
                            borderTopRightRadius: 32,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: -4 },
                            shadowOpacity: 0.2,
                            shadowRadius: 12,
                            elevation: 12,
                        }}>
                            {/* Modal Header */}
                            <View className="flex-row items-center justify-between px-6 py-5" style={{
                                borderBottomWidth: 1,
                                borderBottomColor: '#E3F2FD',
                            }}>
                                <Text className="text-heading font-avenir-bold text-textStrong">
                                    {bookingStep === 'slots' && 'Select Time Slot'}
                                    {bookingStep === 'payment' && 'Payment Method'}
                                    {bookingStep === 'success' && 'Booking Confirmed!'}
                                </Text>
                                <Pressable
                                    onPress={handleCloseModal}
                                    className="w-10 h-10 rounded-full items-center justify-center"
                                    style={({ pressed }) => ({
                                        backgroundColor: pressed ? '#E3F2FD' : 'transparent',
                                    })}
                                >
                                    <Ionicons name="close" size={28} color="#666" />
                                </Pressable>
                            </View>

                            {/* Time Slot Selection */}
                            {bookingStep === 'slots' && (
                                <ScrollView className="px-6 py-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                                    <Text className="text-subheading font-avenir-semibold text-textLight mb-4">
                                        Available slots for {fullName}
                                    </Text>
                                    {therapist.availableSlots && therapist.availableSlots.map(slot => {
                                        const formatted = formatDate(slot);
                                        const isSelected = selectedSlot === slot;
                                        return (
                                            <Pressable
                                                key={slot}
                                                onPress={() => handleSlotSelection(slot)}
                                                className="rounded-2xl p-4 mb-3 flex-row items-center justify-between"
                                                style={({ pressed }) => ({
                                                    backgroundColor: isSelected ? '#E3F2FD' : '#F8F9FA',
                                                    borderWidth: 2,
                                                    borderColor: isSelected ? '#2196F3' : '#E3F2FD',
                                                    opacity: pressed ? 0.7 : 1,
                                                    shadowColor: isSelected ? '#2196F3' : '#000',
                                                    shadowOffset: { width: 0, height: 2 },
                                                    shadowOpacity: isSelected ? 0.2 : 0.05,
                                                    shadowRadius: 4,
                                                    elevation: isSelected ? 3 : 1,
                                                })}
                                            >
                                                <View className="flex-row items-center flex-1">
                                                    <View className="items-center mr-4">
                                                        <Text className="text-sm font-avenir text-textLight">
                                                            {formatted.day}
                                                        </Text>
                                                        <Text className="text-2xl font-avenir-bold text-textStrong">
                                                            {formatted.date}
                                                        </Text>
                                                        <Text className="text-sm font-avenir text-textLight">
                                                            {formatted.month}
                                                        </Text>
                                                    </View>
                                                    <View className="flex-1">
                                                        <View className="flex-row items-center">
                                                            <Ionicons name="time" size={18} color="#64B5F6" />
                                                            <Text className="text-base font-avenir-semibold text-textStrong ml-2">
                                                                {formatted.time}
                                                            </Text>
                                                        </View>
                                                        <Text className="text-sm font-avenir text-textLight mt-1">
                                                            60 minutes session
                                                        </Text>
                                                    </View>
                                                </View>
                                                {isSelected && (
                                                    <Ionicons name="checkmark-circle" size={28} color="#2196F3" />
                                                )}
                                            </Pressable>
                                        );
                                    })}

                                    {/* Continue Button */}
                                    {selectedSlot ? (
                                        <View style={{
                                            marginTop: 16,
                                            borderRadius: 16,
                                            shadowColor: '#2196F3',
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 8,
                                            elevation: 4,
                                        }}>
                                            <ExpoLinearGradient
                                                colors={['#42A5F5', '#2196F3']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                style={{ borderRadius: 16 }}
                                            >
                                                <TouchableOpacity
                                                    onPress={handleContinueToPayment}
                                                    activeOpacity={0.8}
                                                    className="py-4"
                                                >
                                                    <Text className="text-heading font-avenir-bold text-white text-center">
                                                        Continue to Payment
                                                    </Text>
                                                </TouchableOpacity>
                                            </ExpoLinearGradient>
                                        </View>
                                    ) : (
                                        <View
                                            className="mt-4 rounded-2xl py-4"
                                            style={{
                                                backgroundColor: '#F5F5F5',
                                                borderWidth: 2,
                                                borderColor: '#E0E0E0',
                                                borderStyle: 'dashed',
                                            }}
                                        >
                                            <Text className="text-heading font-avenir-semibold text-center" style={{ color: '#9E9E9E' }}>
                                                Select a time slot to continue
                                            </Text>
                                        </View>
                                    )}
                                </ScrollView>
                            )}

                            {/* Payment Method Selection */}
                            {bookingStep === 'payment' && selectedSlot && (
                                <ScrollView className="px-6 py-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                                    {/* Summary */}
                                    <View className="bg-iceBlue rounded-2xl p-4 mb-4" style={{
                                        borderWidth: 1,
                                        borderColor: '#B3E5FC',
                                    }}>
                                        <Text className="text-sm font-avenir-semibold text-textStrong mb-2">
                                            Session Summary
                                        </Text>
                                        <View className="flex-row justify-between mb-1">
                                            <Text className="text-sm font-avenir text-textBody">
                                                Therapist:
                                            </Text>
                                            <Text className="text-sm font-avenir-semibold text-textStrong">
                                                {fullName}
                                            </Text>
                                        </View>
                                        <View className="flex-row justify-between mb-1">
                                            <Text className="text-sm font-avenir text-textBody">
                                                Date & Time:
                                            </Text>
                                            <Text className="text-sm font-avenir-semibold text-textStrong">
                                                {formatDate(selectedSlot).day}, {formatDate(selectedSlot).date} {formatDate(selectedSlot).month} • {formatDate(selectedSlot).time}
                                            </Text>
                                        </View>
                                        <View className="border-t border-borderBlue my-2" />
                                        <View className="flex-row justify-between">
                                            <Text className="text-base font-avenir-bold text-textStrong">
                                                Total:
                                            </Text>
                                            <Text className="text-lg font-avenir-bold text-primaryBlue">
                                                EGP {therapist.price}
                                            </Text>
                                        </View>
                                    </View>

                                    <Text className="text-subheading font-avenir-semibold text-textLight mb-4">
                                        Select payment method
                                    </Text>

                                    {/* Payment Methods */}
                                    <Pressable
                                        onPress={() => setPaymentMethod('card')}
                                        className="rounded-2xl p-4 mb-3 flex-row items-center"
                                        style={({ pressed }) => ({
                                            backgroundColor: paymentMethod === 'card' ? '#E3F2FD' : '#F8F9FA',
                                            borderWidth: 2,
                                            borderColor: paymentMethod === 'card' ? '#2196F3' : '#E3F2FD',
                                            opacity: pressed ? 0.7 : 1,
                                            shadowColor: paymentMethod === 'card' ? '#2196F3' : '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: paymentMethod === 'card' ? 0.2 : 0.05,
                                            shadowRadius: 4,
                                            elevation: paymentMethod === 'card' ? 3 : 1,
                                        })}
                                    >
                                        <Ionicons name="card" size={32} color="#2196F3" />
                                        <View className="flex-1 ml-4">
                                            <Text className="text-base font-avenir-semibold text-textStrong">
                                                Credit / Debit Card
                                            </Text>
                                            <Text className="text-sm font-avenir text-textLight">
                                                Pay securely with your card
                                            </Text>
                                        </View>
                                        {paymentMethod === 'card' && (
                                            <Ionicons name="checkmark-circle" size={28} color="#2196F3" />
                                        )}
                                    </Pressable>

                                    <Pressable
                                        onPress={() => setPaymentMethod('wallet')}
                                        className="rounded-2xl p-4 mb-3 flex-row items-center"
                                        style={({ pressed }) => ({
                                            backgroundColor: paymentMethod === 'wallet' ? '#E3F2FD' : '#F8F9FA',
                                            borderWidth: 2,
                                            borderColor: paymentMethod === 'wallet' ? '#2196F3' : '#E3F2FD',
                                            opacity: pressed ? 0.7 : 1,
                                            shadowColor: paymentMethod === 'wallet' ? '#2196F3' : '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: paymentMethod === 'wallet' ? 0.2 : 0.05,
                                            shadowRadius: 4,
                                            elevation: paymentMethod === 'wallet' ? 3 : 1,
                                        })}
                                    >
                                        <Ionicons name="wallet" size={32} color="#2196F3" />
                                        <View className="flex-1 ml-4">
                                            <Text className="text-base font-avenir-semibold text-textStrong">
                                                Mobile Wallet
                                            </Text>
                                            <Text className="text-sm font-avenir text-textLight">
                                                Vodafone Cash, Orange Money, etc.
                                            </Text>
                                        </View>
                                        {paymentMethod === 'wallet' && (
                                            <Ionicons name="checkmark-circle" size={28} color="#2196F3" />
                                        )}
                                    </Pressable>

                                    {/* Payment Button */}
                                    {paymentMethod ? (
                                        <View style={{
                                            marginTop: 16,
                                            borderRadius: 16,
                                            shadowColor: '#4CAF50',
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 8,
                                            elevation: 4,
                                        }}>
                                            <ExpoLinearGradient
                                                colors={['#66BB6A', '#4CAF50']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                style={{ borderRadius: 16 }}
                                            >
                                                <TouchableOpacity
                                                    onPress={handlePayment}
                                                    activeOpacity={0.8}
                                                    className="py-4 flex-row items-center justify-center"
                                                >
                                                    <Ionicons name="card-outline" size={22} color="#FFFFFF" />
                                                    <Text className="text-heading font-avenir-bold text-white text-center ml-2">
                                                        Pay EGP {therapist.price}
                                                    </Text>
                                                </TouchableOpacity>
                                            </ExpoLinearGradient>
                                        </View>
                                    ) : (
                                        <View
                                            className="mt-4 rounded-2xl py-4"
                                            style={{
                                                backgroundColor: '#F5F5F5',
                                                borderWidth: 2,
                                                borderColor: '#E0E0E0',
                                                borderStyle: 'dashed',
                                            }}
                                        >
                                            <Text className="text-heading font-avenir-semibold text-center" style={{ color: '#9E9E9E' }}>
                                                Select a payment method
                                            </Text>
                                        </View>
                                    )}
                                </ScrollView>
                            )}

                            {/* Success Screen */}
                            {bookingStep === 'success' && (
                                <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32, alignItems: 'center' }}>
                                    <View className="w-24 h-24 rounded-full items-center justify-center mb-6" style={{
                                        backgroundColor: '#E8F5E9',
                                    }}>
                                        <Ionicons name="checkmark-circle" size={72} color="#4CAF50" />
                                    </View>
                                    <Text className="text-heading-main font-avenir-bold text-textStrong text-center mb-3">
                                        Booking Confirmed!
                                    </Text>
                                    <Text className="text-subheading font-avenir text-textBody text-center mb-6">
                                        Your session with {fullName} has been successfully booked.
                                    </Text>
                                    {selectedSlot && (
                                        <View className="bg-iceBlue rounded-2xl p-4 w-full mb-6" style={{
                                            borderWidth: 1,
                                            borderColor: '#B3E5FC',
                                        }}>
                                            <View className="flex-row items-center justify-center mb-2">
                                                <Ionicons name="calendar" size={20} color="#2196F3" />
                                                <Text className="text-base font-avenir-semibold text-textStrong ml-2">
                                                    {formatDate(selectedSlot).day}, {formatDate(selectedSlot).date} {formatDate(selectedSlot).month}
                                                </Text>
                                            </View>
                                            <View className="flex-row items-center justify-center">
                                                <Ionicons name="time" size={20} color="#2196F3" />
                                                <Text className="text-base font-avenir-semibold text-textStrong ml-2">
                                                    {formatDate(selectedSlot).time}
                                                </Text>
                                            </View>
                                        </View>
                                    )}
                                    <Pressable
                                        onPress={handleCloseModal}
                                        className="bg-buttonPrimary rounded-2xl py-4 w-full mb-3"
                                        style={({ pressed }) => ({
                                            opacity: pressed ? 0.8 : 1,
                                            shadowColor: '#2196F3',
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 8,
                                            elevation: 4,
                                        })}
                                    >
                                        <Text className="text-heading font-avenir-bold text-white text-center">
                                            Done
                                        </Text>
                                    </Pressable>
                                    <Text className="text-xs font-avenir text-textLight text-center">
                                        A confirmation email has been sent to you
                                    </Text>
                                </ScrollView>
                            )}
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </ExpoLinearGradient>
    );
}

