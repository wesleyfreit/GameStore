import { api } from '@/lib/axios';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, SafeAreaView, Text, View } from 'react-native';

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
        renderItem={({ item }) => (
          <View key={item.id}>
            <Image
              source={{
                uri: 'http://192.168.253.245:8080'.concat(item.imageUrl),
              }}
              style={{
                width: 170,
                height: 75,
              }}
            />

            <Text>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
