import { newFoodProps } from '../../pages/Dashboard';
import { useRef, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

interface Props {
    isOpen: boolean;
    setIsOpen: () => void;
    handleAddFood: (food: newFoodProps) => void;
}

export function ModalAddFood({ isOpen, setIsOpen, handleAddFood }: Props) {
    const formRef = useRef(null);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    async function handleSubmit() {
        handleAddFood({
            name,
            description,
            price,
            image,
        });

        setIsOpen();

        setName('');
        setImage('');
        setPrice('');
        setDescription('');
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Novo Prato</h1>
                <Input
                    name="image"
                    placeholder="Cole o link aqui"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                />

                <Input
                    name="name"
                    placeholder="Ex: Moda Italiana"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <Input
                    name="price"
                    placeholder="Ex: 19.90"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                />

                <Input
                    name="description"
                    placeholder="Descrição"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <button type="submit" data-testid="add-food-button">
                    <p className="text">Adicionar Prato</p>
                    <div className="icon">
                        <FiCheckSquare size={24} />
                    </div>
                </button>
            </Form>
        </Modal>
    );
}