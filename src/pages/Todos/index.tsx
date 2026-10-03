import { Box, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Pencil, RotateCcw, Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DsButton from "../../components/design-system/DsButton";
import Loading from "../../components/global/Loading";
import { createTodo, deleteTodo, getTodos, updateTodo, } from "../../services/todoService";
import type { CreateTodoData, Todo } from "../../types/todo";
import ConfirmDialog from "../../components/global/ConfirmDialog";
import { useTranslation } from "react-i18next";

const Todos = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { register, handleSubmit, reset } = useForm<CreateTodoData>({
    defaultValues: {
      todo: "",
      completed: false,
      userId: 1,
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createTodo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      setEditingTodo(null);
      reset();

      toast.success("Todo created");
    },

    onError: () => {
      toast.error("Failed to create todo");
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: CreateTodoData;
    }) => updateTodo(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });

      setEditingTodo(null);
      reset({
        todo: "",
        completed: false,
        userId: 1,
      });

      toast.success("Todo updated");
    },

    onError: () => {
      toast.error("Failed to update todo");
    },
  });


  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });

      setDeleteId(null);

      toast.success(t("todos.deleteSuccess"));
    },

    onError: () => {
      toast.error("Failed to delete todo");
    },
  });

  const handleDelete = () => {
    if (deleteId === null) {
      return;
    }

    deleteMutation.mutate(deleteId);
  };

  // COMPLETE / UNDO
  const toggleCompletedMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: CreateTodoData;
    }) => updateTodo(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });

      toast.success("Todo status updated");
    },

    onError: () => {
      toast.error("Failed to update todo status");
    },
  });


  // EDIT
  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);

    reset({
      todo: todo.todo,
      completed: todo.completed,
      userId: todo.userId,
    });
  };


  // CANCEL EDIT
  const handleCancelEdit = () => {
    setEditingTodo(null);

    reset({
      todo: "",
      completed: false,
      userId: 1,
    });
  };

  // COMPLETE / UNDO
  const handleToggleCompleted = (todo: Todo) => {
    toggleCompletedMutation.mutate({
      id: todo.id,
      data: {
        todo: todo.todo,
        completed: !todo.completed,
        userId: todo.userId,
      },
    });
  };;


  // SUBMIT
  const onSubmit = (data: CreateTodoData) => {
    if (editingTodo) {
      updateMutation.mutate({
        id: editingTodo.id,
        data,
      });

      return;
    }

    createMutation.mutate(data);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>{t("common.error")}</div>;
  }

  const isSubmitting =
    createMutation.isPending ||
    updateMutation.isPending;

  return (
    <Box>
      <Typography variant="h4">
        {t("todos.title")}
      </Typography>

      <Box className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">

        {/* Left: Add / Edit */}
        <Box className="self-start rounded-xl lg:col-span-5 border p-4 lg:sticky lg:top-4">
          <Typography variant="h6">
            {editingTodo ? "Edit Todo" : "Add Todo"}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6"
          >
            <TextField
              fullWidth
              placeholder="Enter todo"
              {...register("todo", {
                required: "Todo is required",
              })}
            />

            <FormControlLabel
              control={<Checkbox {...register("completed")} />}
              label="Completed"
            />

            <Box className="mt-4 flex gap-3">
              <DsButton type="submit" color={editingTodo ? "primary" : "success"} size="large" loading={isSubmitting}>{editingTodo ? "Update Todo" : "Add Todo"}</DsButton>
              {editingTodo && (<DsButton type="button" variant="outlined" onClick={handleCancelEdit}>Cancel</DsButton>)}
            </Box>
          </Box>
        </Box>

        {/* Right: Todo List */}
        <Box className="rounded-xl lg:col-span-7 border p-4">
          <Typography variant="h6">
            Todo List
          </Typography>

          <Box className="mt-6 flex flex-col gap-3">
            {data?.todos.map((todo) => (
              <Box
                key={todo.id}
                className="flex items-center gap-3 rounded-lg border p-3"
              >

                <Typography className={`flex-1 ${todo.completed ? "text-gray-400 line-through" : ""}`}>
                  {todo.todo}
                </Typography>

                {!todo.completed
                  ?
                  (<DsButton variant="outlined" color="success" iconButton onClick={() => handleToggleCompleted(todo)}><Check size={18} /></DsButton>)
                  :
                  (<DsButton variant="outlined" color="warning" iconButton onClick={() => handleToggleCompleted(todo)}><RotateCcw size={18} /></DsButton>)}

                <DsButton variant="outlined" color="primary" iconButton onClick={() => handleEdit(todo)}><Pencil size={18} /></DsButton>
                <DsButton variant="outlined" color="error" iconButton onClick={() => setDeleteId(todo.id)} disabled={deleteMutation.isPending}><Trash size={18} /></DsButton>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <ConfirmDialog
        open={deleteId !== null}
        title={t("todos.deleteTitle")}
        message={t("todos.deleteMessage")}
        confirmText={t("common.delete")}
        cancelText={t("common.cancel")}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default Todos;