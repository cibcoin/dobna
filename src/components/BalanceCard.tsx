// src/components/BalanceCard.tsx
import CustomText from './UI/CustomText';

export default function BalanceCard({ balance }: { balance: number }) {
  return (
    <View className="bg-gray-800 rounded-xl p-4">
      <CustomText variant="body">موجودی حساب</CustomText>
      <CustomText variant="numberBold" isNumber={true}>
        {balance.toLocaleString('fa-IR')} تومان
      </CustomText>
    </View>
  );
}