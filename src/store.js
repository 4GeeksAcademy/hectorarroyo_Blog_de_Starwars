export const initialStore = () => {
  return {
    message: null,
    people: [],
    planets: [],
    vehicles: [],
    favorites: [],  
    loading: {
      people: false,
      planets: false,
      vehicles: false,
    },
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case "set_people":
      return { ...store, people: action.payload };

    case "set_planets":
      return { ...store, planets: action.payload };

    case "set_vehicles":
      return { ...store, vehicles: action.payload };

    case "set_loading":
      return {
        ...store,
        loading: { ...store.loading, [action.payload.type]: action.payload.value },
      };

    case "toggle_favorite": {
      const item = action.payload; 
      const exists = store.favorites.find(
        (f) => f.uid === item.uid && f.type === item.type
      );
      return {
        ...store,
        favorites: exists
          ? store.favorites.filter(
              (f) => !(f.uid === item.uid && f.type === item.type)
            )
          : [...store.favorites, item],
      };
    }

    default:
      throw Error("Unknown action: " + action.type);
  }
}