import { useState, useEffect } from 'react'
import type { User, UserBase } from '../types/user'
import { userService } from '../services/userService'

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    try {
      const data = await userService.getUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const createUser = async (userData: UserBase) => {
    try {
      await userService.createUser(userData)
      fetchUsers()
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  const deleteUser = async (id: string) => {
    try {
      await userService.deleteUser(id)
      fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return { users, createUser, deleteUser }
}
