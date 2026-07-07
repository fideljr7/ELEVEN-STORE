package com.mycompany.eleven.store.servlet;

import com.mycompany.eleven.store.conexion.conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "LoginServlet", urlPatterns = {"/login"})
public class LoginServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.sendRedirect("login.html");

    }

    @Override
protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

    String correo = request.getParameter("correo");
    String password = request.getParameter("password");

    conexion con = new conexion();
    Connection cn = con.conectar();
    

    try {

        String sql = "SELECT * FROM usuarios WHERE correo=? AND password=?";

        PreparedStatement ps = cn.prepareStatement(sql);

        ps.setString(1, correo);
        ps.setString(2, password);

        ResultSet rs = ps.executeQuery();

        response.setContentType("text/html;charset=UTF-8");

        PrintWriter out = response.getWriter();

        if (rs.next()) {

    request.getSession().setAttribute("usuario", rs.getString("nombre"));

    response.sendRedirect("index.jsp");

} else {

    out.println("<h1>Correo o contraseña incorrectos</h1>");

}

    } catch (Exception e) {

        response.getWriter().println(e.getMessage());

    }

}
}