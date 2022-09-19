import { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { AppwriteException } from 'appwrite';
import productsApi from 'api/products';
import { QueryKey } from 'components/providers/Query';
import productDetailsReducer from './reducer';
import { ACTIONS } from './types';
import addToCart from './actions/add-to-cart';

export default function useProductDetailsState() {
  const { goBack } = useHistory();

  const [state, dispatch] = useReducer(productDetailsReducer, {
    showModal: false,
    quantity: 1,
  });

  const { id } = useParams() as { id: string };
  const { isLoading, data: product, error } = useQuery(
    [QueryKey.FETCH_PRODUCT, id],
    () => productsApi.get(id),
  );

  return {
    ...state,
    product,
    isLoading,
    error: (error as AppwriteException)?.code,
    goBack,
    openModal: () => dispatch({ type: ACTIONS.OPEN_MODAL }),
    closeModal: () => dispatch({ type: ACTIONS.CLOSE_MODAL }),
    increaseQuantity: () => dispatch({
      type: ACTIONS.SET_QUANTITY,
      payload: state.quantity + 1,
    }),
    decreaseQuantity: () => dispatch({
      type: ACTIONS.SET_QUANTITY,
      payload: state.quantity - 1,
    }),
    addToCart: addToCart(dispatch, state, product),
  };
}
