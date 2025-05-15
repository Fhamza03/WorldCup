package com.fssm.worldcup.Controllers.Restoration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fssm.worldcup.Models.General.Supporter;
import com.fssm.worldcup.Models.Restoration.*;
import com.fssm.worldcup.Services.Restoration.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.*;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(OrderController.class)
public class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderService orderService;

    @Autowired
    private ObjectMapper objectMapper;

    private Order order1;
    private Order order2;
    private Order fanIdOrder;
    private List<Order> orderList;
    private Restaurant restaurant;
    private Supporter supporter;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @BeforeEach
    void setUp() {
        // Réinitialiser les mocks avant chaque test
        Mockito.reset(orderService);

        // Dates pour les tests
        startDate = LocalDateTime.of(2025, 5, 1, 0, 0);
        endDate = LocalDateTime.of(2025, 5, 15, 23, 59);

        // Créer un restaurant pour les tests
        restaurant = new Restaurant();
        restaurant.setId(1);
        restaurant.setName("Test Restaurant");

        // Créer un supporter pour les tests
        supporter = new Supporter();
        supporter.setUserId(1);
        supporter.setIsFanIdValid(true);

        // Créer des commandes pour les tests
        order1 = new Order();
        order1.setId(1);
        order1.setRestaurant(restaurant);
        order1.setSupporter(supporter);
        order1.setOrderDate(LocalDateTime.of(2025, 5, 10, 12, 30));
        order1.setStatus("CONFIRMED");
        order1.setPaymentStatus("PAID");
        order1.setTotalAmount(35.0);
        order1.setUsedFanId(false);
        order1.setOrderItems(createOrderItems(order1, false));

        order2 = new Order();
        order2.setId(2);
        order2.setRestaurant(restaurant);
        order2.setSupporter(supporter);
        order2.setOrderDate(LocalDateTime.of(2025, 5, 12, 18, 45));
        order2.setStatus("PENDING");
        order2.setPaymentStatus("PENDING");
        order2.setTotalAmount(42.0);
        order2.setUsedFanId(false);
        order2.setOrderItems(createOrderItems(order2, false));

        fanIdOrder = new Order();
        fanIdOrder.setId(3);
        fanIdOrder.setRestaurant(restaurant);
        fanIdOrder.setSupporter(supporter);
        fanIdOrder.setOrderDate(LocalDateTime.of(2025, 5, 14, 14, 20));
        fanIdOrder.setStatus("COMPLETED");
        fanIdOrder.setPaymentStatus("PAID");
        fanIdOrder.setTotalAmount(30.0);
        fanIdOrder.setUsedFanId(true);
        fanIdOrder.setOrderItems(createOrderItems(fanIdOrder, true));

        orderList = Arrays.asList(order1, order2, fanIdOrder);
    }

    private List<OrderItem> createOrderItems(Order order, boolean isFanId) {
        OrderItem item1 = new OrderItem();
        item1.setId(isFanId ? 5 : 1);
        item1.setOrder(order);
        item1.setProductName("Pizza Margherita");
        item1.setProductPrice(15.0);
        item1.setQuantity(2);
        item1.setTotalPrice(30.0);

        if (!isFanId) {
            OrderItem item2 = new OrderItem();
            item2.setId(isFanId ? 6 : 2);
            item2.setOrder(order);
            item2.setProductName("Coca Cola");
            item2.setProductPrice(2.5);
            item2.setQuantity(2);
            item2.setTotalPrice(5.0);

            return Arrays.asList(item1, item2);
        } else {
            return Collections.singletonList(item1);
        }
    }

    @Test
    void getAllOrders_ShouldReturnAllOrders() throws Exception {
        when(orderService.getAllOrders()).thenReturn(orderList);

        mockMvc.perform(get("/api/orders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].status", is("CONFIRMED")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].status", is("PENDING")))
                .andExpect(jsonPath("$[2].id", is(3)))
                .andExpect(jsonPath("$[2].usedFanId", is(true)));

        verify(orderService, times(1)).getAllOrders();
    }

    @Test
    void getOrderById_WithExistingId_ShouldReturnOrder() throws Exception {
        when(orderService.getOrderById(1)).thenReturn(Optional.of(order1));

        mockMvc.perform(get("/api/orders/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.status", is("CONFIRMED")))
                .andExpect(jsonPath("$.paymentStatus", is("PAID")))
                .andExpect(jsonPath("$.totalAmount", is(35.0)));

        verify(orderService, times(1)).getOrderById(1);
    }

    @Test
    void getOrderById_WithNonExistingId_ShouldReturnNotFound() throws Exception {
        when(orderService.getOrderById(99)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/orders/99"))
                .andExpect(status().isNotFound());

        verify(orderService, times(1)).getOrderById(99);
    }

    @Test
    void getOrdersByRestaurant_ShouldReturnRestaurantOrders() throws Exception {
        when(orderService.getOrdersByRestaurant(1)).thenReturn(orderList);

        mockMvc.perform(get("/api/orders/restaurant/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[2].id", is(3)));

        verify(orderService, times(1)).getOrdersByRestaurant(1);
    }

    @Test
    void getOrdersBySupporter_ShouldReturnSupporterOrders() throws Exception {
        when(orderService.getOrdersBySupporter(1)).thenReturn(orderList);

        mockMvc.perform(get("/api/orders/supporter/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[2].id", is(3)));

        verify(orderService, times(1)).getOrdersBySupporter(1);
    }

    @Test
    void getOrdersByRestaurantAndStatus_ShouldReturnFilteredOrders() throws Exception {
        when(orderService.getOrdersByRestaurantAndStatus(1, "PENDING")).thenReturn(Arrays.asList(order2));

        mockMvc.perform(get("/api/orders/restaurant/1/status/PENDING"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is(2)))
                .andExpect(jsonPath("$[0].status", is("PENDING")));

        verify(orderService, times(1)).getOrdersByRestaurantAndStatus(1, "PENDING");
    }

    @Test
    void getOrdersByPeriod_ShouldReturnOrdersInPeriod() throws Exception {
        when(orderService.getOrdersByPeriod(eq(1), any(LocalDateTime.class), any(LocalDateTime.class)))
                .thenReturn(orderList);

        mockMvc.perform(get("/api/orders/restaurant/1/period")
                        .param("start", "2025-05-01T00:00:00")
                        .param("end", "2025-05-15T23:59:00"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[2].id", is(3)));

        verify(orderService, times(1)).getOrdersByPeriod(eq(1), any(LocalDateTime.class), any(LocalDateTime.class));
    }

    @Test
    void getOrdersWithFanId_ShouldReturnFanIdOrders() throws Exception {
        when(orderService.getOrdersWithFanId()).thenReturn(Arrays.asList(fanIdOrder));

        mockMvc.perform(get("/api/orders/fan-id"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is(3)))
                .andExpect(jsonPath("$[0].usedFanId", is(true)));

        verify(orderService, times(1)).getOrdersWithFanId();
    }

    @Test
    void createOrder_WithValidData_ShouldCreateAndReturnOrder() throws Exception {
        Order newOrder = new Order();
        newOrder.setUsedFanId(false);
        List<OrderItem> orderItems = new ArrayList<>();
        OrderItem item = new OrderItem();
        item.setProductName("Test Product");
        item.setProductPrice(10.0);
        item.setQuantity(2);
        orderItems.add(item);
        newOrder.setOrderItems(orderItems);

        Order createdOrder = new Order();
        createdOrder.setId(4);
        createdOrder.setRestaurant(restaurant);
        createdOrder.setSupporter(supporter);
        createdOrder.setOrderDate(LocalDateTime.now());
        createdOrder.setStatus("PENDING");
        createdOrder.setPaymentStatus("PENDING");
        createdOrder.setTotalAmount(20.0);
        createdOrder.setUsedFanId(false);
        createdOrder.setOrderItems(orderItems);

        when(orderService.createOrder(any(Order.class), eq(1), eq(1))).thenReturn(createdOrder);

        mockMvc.perform(post("/api/orders/restaurant/1/supporter/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newOrder)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(4)))
                .andExpect(jsonPath("$.status", is("PENDING")))
                .andExpect(jsonPath("$.totalAmount", is(20.0)));

        verify(orderService, times(1)).createOrder(any(Order.class), eq(1), eq(1));
    }

    @Test
    void createOrder_WithInvalidData_ShouldReturnBadRequest() throws Exception {
        Order newOrder = new Order();
        newOrder.setUsedFanId(true); // Fan ID non valide

        when(orderService.createOrder(any(Order.class), eq(1), eq(2)))
                .thenThrow(new IllegalArgumentException("Cannot use Fan ID discounts with invalid Fan ID"));

        mockMvc.perform(post("/api/orders/restaurant/1/supporter/2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newOrder)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Cannot use Fan ID discounts with invalid Fan ID"));

        verify(orderService, times(1)).createOrder(any(Order.class), eq(1), eq(2));
    }

    @Test
    void updateOrderStatus_WithValidStatus_ShouldUpdateAndReturnOrder() throws Exception {
        Order updatedOrder = new Order();
        updatedOrder.setId(1);
        updatedOrder.setStatus("PREPARING");
        updatedOrder.setRestaurant(restaurant);
        updatedOrder.setSupporter(supporter);
        updatedOrder.setOrderDate(order1.getOrderDate());
        updatedOrder.setPaymentStatus(order1.getPaymentStatus());
        updatedOrder.setTotalAmount(order1.getTotalAmount());
        updatedOrder.setUsedFanId(order1.getUsedFanId());

        when(orderService.updateOrderStatus(eq(1), eq("PREPARING"))).thenReturn(updatedOrder);

        mockMvc.perform(patch("/api/orders/1/status")
                        .param("status", "PREPARING"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.status", is("PREPARING")));

        verify(orderService, times(1)).updateOrderStatus(eq(1), eq("PREPARING"));
    }

    @Test
    void updateOrderStatus_WithInvalidStatus_ShouldReturnBadRequest() throws Exception {
        when(orderService.updateOrderStatus(eq(1), eq("INVALID_STATUS")))
                .thenThrow(new IllegalArgumentException("Invalid order status: INVALID_STATUS"));

        mockMvc.perform(patch("/api/orders/1/status")
                        .param("status", "INVALID_STATUS"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Invalid order status: INVALID_STATUS"));

        verify(orderService, times(1)).updateOrderStatus(eq(1), eq("INVALID_STATUS"));
    }

    @Test
    void updatePaymentStatus_WithValidStatus_ShouldUpdateAndReturnOrder() throws Exception {
        Order updatedOrder = new Order();
        updatedOrder.setId(2);
        updatedOrder.setStatus(order2.getStatus());
        updatedOrder.setPaymentStatus("PAID");
        updatedOrder.setRestaurant(restaurant);
        updatedOrder.setSupporter(supporter);
        updatedOrder.setOrderDate(order2.getOrderDate());
        updatedOrder.setTotalAmount(order2.getTotalAmount());
        updatedOrder.setUsedFanId(order2.getUsedFanId());

        when(orderService.updatePaymentStatus(eq(2), eq("PAID"))).thenReturn(updatedOrder);

        mockMvc.perform(patch("/api/orders/2/payment-status")
                        .param("paymentStatus", "PAID"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(2)))
                .andExpect(jsonPath("$.paymentStatus", is("PAID")));

        verify(orderService, times(1)).updatePaymentStatus(eq(2), eq("PAID"));
    }

    @Test
    void updatePaymentStatus_WithInvalidStatus_ShouldReturnBadRequest() throws Exception {
        when(orderService.updatePaymentStatus(eq(2), eq("INVALID_STATUS")))
                .thenThrow(new IllegalArgumentException("Invalid payment status: INVALID_STATUS"));

        mockMvc.perform(patch("/api/orders/2/payment-status")
                        .param("paymentStatus", "INVALID_STATUS"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Invalid payment status: INVALID_STATUS"));

        verify(orderService, times(1)).updatePaymentStatus(eq(2), eq("INVALID_STATUS"));
    }

    @Test
    void deleteOrder_ShouldDeleteAndReturnNoContent() throws Exception {
        doNothing().when(orderService).deleteOrder(1);

        mockMvc.perform(delete("/api/orders/1"))
                .andExpect(status().isNoContent());

        verify(orderService, times(1)).deleteOrder(1);
    }
}