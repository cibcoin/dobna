
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 40) / 9; // 9 ستون

interface DobnaCardProps {
  cardNumber: number;
  userName: string;
  numbers: number[][]; // 3x9 matrix
  markedNumbers: Set<number>;
  blinkingNumber: number | null; // عددی که باید چشمک بزند
  onBlinkComplete?: () => void;
}

export default function DobnaCardWithBlink({
  cardNumber,
  userName,
  numbers,
  markedNumbers,
  blinkingNumber,
  onBlinkComplete
}: BingoCardProps) {
  const [blinkingCells, setBlinkingCells] = useState<{ row: number; col: number }[]>([]);
  const blinkAnimations = useRef<{ [key: string]: Animated.Value }>({});
  
  useEffect(() => {
    if (blinkingNumber !== null) {
      // پیدا کردن سلول‌هایی که این عدد را دارند
      const cells: { row: number; col: number }[] = [];
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 9; col++) {
          if (numbers[row][col] === blinkingNumber) {
            cells.push({ row, col });
            // ایجاد انیمیشن برای هر سلول
            const key = `${row}-${col}`;
            if (!blinkAnimations.current[key]) {
              blinkAnimations.current[key] = new Animated.Value(0);
            }
          }
        }
      }
      
      setBlinkingCells(cells);
      
      // اجرای انیمیشن چشمک زدن
      const animations = cells.map(({ row, col }) => {
        const key = `${row}-${col}`;
        return Animated.sequence([
          Animated.timing(blinkAnimations.current[key], {
            toValue: 1,
            duration: 150,
            useNativeDriver: false
          }),
          Animated.timing(blinkAnimations.current[key], {
            toValue: 0,
            duration: 150,
            useNativeDriver: false
          }),
          Animated.timing(blinkAnimations.current[key], {
            toValue: 1,
            duration: 150,
            useNativeDriver: false
          }),
          Animated.timing(blinkAnimations.current[key], {
            toValue: 0,
            duration: 150,
            useNativeDriver: false
          })
        ]);
      });
      
      Animated.parallel(animations).start(() => {
        setBlinkingCells([]);
        onBlinkComplete?.();
      });
    }
  }, [blinkingNumber]);
  
  const getCellStyle = (row: number, col: number, value: number) => {
    const isMarked = markedNumbers.has(value);
    const isBlinking = blinkingCells.some(cell => cell.row === row && cell.col === col);
    const key = `${row}-${col}`;
    const blinkValue = blinkAnimations.current[key]?.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255, 255, 255, 1)', 'rgba(255, 215, 0, 0.8)']
    }) || 'rgba(255, 255, 255, 1)';
    
    return {
      backgroundColor: isMarked ? '#4CAF50' : (isBlinking ? blinkValue : '#2C3E50'),
      borderWidth: 1,
      borderColor: '#34495E',
      justifyContent: 'center',
      alignItems: 'center',
      width: CARD_SIZE,
      height: CARD_SIZE
    };
  };
  
  return (
    <View style={styles.cardContainer}>
      {/* هدر کارت */}
      <View style={styles.cardHeader}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.cardNumber}>#{cardNumber}</Text>
      </View>
      
      {/* بدنه کارت - جدول 3x9 */}
      <View style={styles.cardBody}>
        {numbers.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.cardRow}>
            {row.map((value, colIndex) => (
              <Animated.View
                key={`cell-${rowIndex}-${colIndex}`}
                style={[
                  styles.cardCell,
                  getCellStyle(rowIndex, colIndex, value)
                ]}
              >
                {value !== 0 && (
                  <Text style={[
                    styles.cellText,
                    markedNumbers.has(value) && styles.markedText
                  ]}>
                    {value}
                  </Text>
                )}
              </Animated.View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1E272E',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 4,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#2C3E50',
    borderBottomWidth: 1,
    borderBottomColor: '#34495E'
  },
  userName: {
    color: '#ECF0F1',
    fontSize: 12,
    fontWeight: 'bold'
  },
  cardNumber: {
    color: '#F1C40F',
    fontSize: 12,
    fontWeight: 'bold'
  },
  cardBody: {
    padding: 4
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cardCell: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    borderRadius: 4
  },
  cellText: {
    color: '#ECF0F1',
    fontSize: CARD_SIZE * 0.35,
    fontWeight: '600'
  },
  markedText: {
    color: '#FFFFFF',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  }
});