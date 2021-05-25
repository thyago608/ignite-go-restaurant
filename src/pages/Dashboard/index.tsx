import { useState, useEffect } from 'react';

import { FoodsContainer } from './styles';
import { Header } from '../../components/Header';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';

import { FoodProps, newFoodProps } from '../../assets/interfaces';

import api from '../../services/api';

export function Dashboard() {
    const [foods, setFoods] = useState<FoodProps[]>([]);
    const [editingFood, setEditingFood] = useState<FoodProps>({} as FoodProps);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);


    //Função de DELETAR uma Food
    async function handleDeleteFood(id: number): Promise<void> {
        await api.delete(`/foods/${id}`);

        const foodsFiltered = foods.filter((food) => food.id !== id);

        setFoods(foodsFiltered);
    }


    //Função de CRIAR uma Food
    function handleAddFood(food: newFoodProps) {
        AddFood(food);
    }

    //Função auxiliar de criar uma food
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

    //Função que ABRE e FECHA o Modal de Criação Food
    function toogleModal() {
        setModalOpen(prevState => !prevState);
    }

    //Função que ABRE e FECHA o Modal de Editar Food
    function toogleEditModal() {
        setEditModalOpen(prevState => !prevState);
    }

    async function handleUpdateFood(food: FoodProps) {
        try {
            const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
                ...editingFood, ...food
            });

        } catch (e) {
            console.log(e);
        }
    }

    //Adicionando o Food a edição
    function handleEditFood(food: FoodProps) {
        setEditingFood(food);
        setEditModalOpen(true);
    }

    //Realizando o carregamento de foods da api
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