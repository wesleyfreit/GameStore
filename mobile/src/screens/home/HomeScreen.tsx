import { Card } from '@/components/Card';
import { api } from '@/lib/axios';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView } from 'react-native';

export const HomeScreen = () => {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const request = await api.get('/index');
        setGames(request.data.games);
      } catch (error) {
        if (isAxiosError(error)) {
          const message = error.response?.data;
          Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message}`);
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', marginTop: 15 }}>

      <FlatList
        data={games}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ gap: 8 }}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => <Card game={item} />}
      />
    </SafeAreaView>
  );
};
