import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import {
  PaperProvider,
  Text,
  Button,
  ActivityIndicator,
  Card,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
        Home Screen
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Details")}
      >
        Ir para detalhes
      </Button>
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
        Details Screen
      </Text>
      <Button
        mode="contained"
        style={{ marginBottom: 12 }}
        onPress={() => navigation.navigate("Movies")}
      >
        Listar filmes
      </Button>
      <Button mode="outlined" onPress={() => navigation.goBack()}>
        Voltar para home
      </Button>
    </View>
  );
}

function MoviesScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(
        "https://www.omdbapi.com/?s=spider%20man&apikey=1cd66749"
      );
      const json = await response.json();
      setData(json.Search);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {isLoading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.imdbID}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <Card style={{ marginBottom: 16 }}>
              {item.Poster !== "N/A" && (
                <Card.Cover source={{ uri: item.Poster }} />
              )}
              <Card.Title title={item.Title} subtitle={item.Year} />
            </Card>
          )}
        />
      )}
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Movies" component={MoviesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}