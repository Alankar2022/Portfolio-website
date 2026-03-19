import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

const WALLPAPERS = [
  {
    id: '1',
    name: 'Aurora Lake',
    imageUrl:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '2',
    name: 'Purple Mountains',
    imageUrl:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '3',
    name: 'Neon City',
    imageUrl:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '4',
    name: 'Forest Mist',
    imageUrl:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '5',
    name: 'Desert Dunes',
    imageUrl:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function App() {
  const systemTheme = useColorScheme();
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(systemTheme === 'dark');
  const [nightModeEnabled, setNightModeEnabled] = useState(false);
  const [selectedWallpaperId, setSelectedWallpaperId] = useState(WALLPAPERS[0].id);

  const selectedWallpaper =
    WALLPAPERS.find((wallpaper) => wallpaper.id === selectedWallpaperId) || WALLPAPERS[0];

  const theme = useMemo(() => {
    const isDark = darkThemeEnabled;

    return {
      background: isDark ? '#0E0E0E' : '#F4F7FB',
      card: isDark ? '#1E1E1E' : '#FFFFFF',
      text: isDark ? '#F8F8F8' : '#101010',
      secondaryText: isDark ? '#CCCCCC' : '#555555',
      border: isDark ? '#333333' : '#E4E7EC',
      accent: '#6C63FF',
      buttonText: '#FFFFFF',
      dimOverlay: nightModeEnabled ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0)',
    };
  }, [darkThemeEnabled, nightModeEnabled]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={darkThemeEnabled ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>Wallpaper Picker</Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>Select one of 5 wallpapers</Text>

        <View style={[styles.previewCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Image source={{ uri: selectedWallpaper.imageUrl }} style={styles.previewImage} />
          <View style={[styles.previewOverlay, { backgroundColor: theme.dimOverlay }]} />
          <Text style={[styles.previewLabel, { color: theme.buttonText }]}>{selectedWallpaper.name}</Text>
        </View>

        <View style={styles.toggleRow}>
          <Text style={[styles.toggleLabel, { color: theme.text }]}>Dark theme</Text>
          <Switch value={darkThemeEnabled} onValueChange={setDarkThemeEnabled} />
        </View>

        <View style={styles.toggleRow}>
          <Text style={[styles.toggleLabel, { color: theme.text }]}>Night mode</Text>
          <Switch value={nightModeEnabled} onValueChange={setNightModeEnabled} />
        </View>

        <FlatList
          data={WALLPAPERS}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            const selected = item.id === selectedWallpaperId;

            return (
              <TouchableOpacity
                onPress={() => setSelectedWallpaperId(item.id)}
                style={[
                  styles.thumbnailCard,
                  {
                    borderColor: selected ? theme.accent : theme.border,
                    backgroundColor: theme.card,
                  },
                ]}
              >
                <Image source={{ uri: item.imageUrl }} style={styles.thumbnailImage} />
                <Text
                  style={[
                    styles.thumbnailText,
                    { color: selected ? theme.accent : theme.secondaryText },
                  ]}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        <TouchableOpacity style={[styles.applyButton, { backgroundColor: theme.accent }]}> 
          <Text style={[styles.applyText, { color: theme.buttonText }]}>Apply Wallpaper</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    marginBottom: 16,
  },
  previewCard: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
    height: 260,
    marginBottom: 20,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  previewOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  previewLabel: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    fontSize: 16,
    fontWeight: '700',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    paddingVertical: 6,
    gap: 10,
  },
  thumbnailCard: {
    width: 128,
    padding: 8,
    borderRadius: 12,
    borderWidth: 2,
  },
  thumbnailImage: {
    width: '100%',
    height: 84,
    borderRadius: 8,
    marginBottom: 6,
  },
  thumbnailText: {
    fontSize: 12,
    fontWeight: '600',
  },
  applyButton: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  applyText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
