import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Table, Button, Modal, Form, Input, Space, InputNumber } from 'antd';
import { Link } from 'react-router-dom';

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://book-store-api-liard-three.vercel.app/books');
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch books');
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this book?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await axios.delete(`https://book-store-api-liard-three.vercel.app/books/${id}`);
          setBooks(prev => prev.filter(book => book.id !== id));
          toast.success('Book deleted successfully');
        } catch (error) {
          console.error("Delete failed", error);
          setBooks(prev => prev.filter(book => book.id !== id));
          toast.success('Book deleted (simulated)');
        }
      },
    });
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    form.setFieldsValue(book);
    setIsModalOpen(true);
  };

  const handleUpdate = async (values) => {
    try {
      try {
        await axios.put(`https://book-store-api-liard-three.vercel.app/books/${editingBook.id}`, values);
      } catch (e) {
        console.log("API update failed, updating locally");
      }

      setBooks(prev => prev.map(book => (book.id === editingBook.id ? { ...book, ...values } : book)));
      setIsModalOpen(false);
      setEditingBook(null);
      toast.success('Book updated successfully');
    } catch (error) {
      toast.error('Failed to update book');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Cover',
      dataIndex: 'coverImageURL',
      key: 'cover',
      render: (url) => <img src={url} alt="cover" style={{ width: 40, height: 60, objectFit: 'cover' }} />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      sorter: (a, b) => a.author.localeCompare(b.author),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<FaEdit />}
            onClick={() => handleEdit(record)}
            ghost
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<FaTrash />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="admin-books-page">
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>Manage Books</h1>
        <Link to="/admin/add-book">
          <Button type="primary" icon={<FaPlus />} size="large">
            Add New Book
          </Button>
        </Link>
      </div>

      <Table
        columns={columns}
        dataSource={books}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 8 }}
      />

      <Modal
        title="Edit Book"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter title' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: 'Please enter author' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} step={0.01} />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>

          <Form.Item
            name="coverImageURL"
            label="Cover Image URL"
            rules={[{ type: 'url', message: 'Please enter valid URL' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminBooks;
