import { useState, useEffect } from 'react';
import { FoodsContainer } from './styles';

import { Header } from '../../components/Header';
import { Food } from '../../components/Food';
import api from '../../services/api';
import { ModalAddFood } from '../../components/ModalAddFood';

export interface FoodProps {
    id: number;
    name: string;
    description: string;
    price: string;
    available: boolean;
    image: string;
}

export type newFoodProps = Omit<FoodProps, "id" | "available">

export function Dashboard() {
    const [foods, setFoods] = useState<FoodProps[]>([]);
    const [editingFood, setEditingFood] = useState<FoodProps>({} as FoodProps);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);


    function handleEditFood(food: FoodProps) {
        setEditingFood(food);
        setEditModalOpen(true);
    }

    async function handleDeleteFood(id: number): Promise<void> {
        await api.delete(`/foods/${id}`);

        const foodsFiltered = foods.filter((food) => food.id !== id);

        setFoods(foodsFiltered);
    }


    function handleAddFood(food: newFoodProps) {
        AddFood(food);
    }

    async function AddFood(food: newFoodProps): Promise<void> {
        try {
            const response = await api.post('/foods', {
                ...food,
                available: true,
            });

            setFoods([...foods, response.data]);
        } catch (e) {
            console.log(e);
        }
    }

    function toogleModal() {
        setModalOpen(prevState => !prevState);
    }
    useEffect(() => {
        async function loadingFood() {
            const { data } = await api.get('/foods');

            setFoods(data);
        }

        loadingFood();
    }, []);

    return (
        <>
            <Header openModal={toogleModal} />
            <ModalAddFood
                isOpen={modalOpen}
                setIsOpen={toogleModal}
                handleAddFood={handleAddFood}
            />
            <FoodsContainer data-testid="foods-list">
                {foods &&
                    foods.map((food: FoodProps) => (
                        <Food
                            key={food.id}
                            food={food}
                            handleDelete={() => handleDeleteFood(food.id)}
                            handleEditFood={() => handleEditFood(food)}
                        />
                    ))}
            </FoodsContainer>
        </>
    );
}