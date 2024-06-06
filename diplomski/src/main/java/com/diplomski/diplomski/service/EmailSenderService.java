package com.diplomski.diplomski.service;

import com.diplomski.diplomski.entity.Rezervacija;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleEmail(String toEmail,
                                String body,
                                String subject){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("springdiplomski@outlook.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);

        mailSender.send(message);
        System.out.println("Mail Send...");
    }

    public void sendEmailWithAttachment(String toEmail,
                                        String body,
                                        String subject,
                                        File file) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

        mimeMessageHelper.setFrom("springdiplomski@outlook.com");
        mimeMessageHelper.setTo(toEmail);
        mimeMessageHelper.setText(body);
        mimeMessageHelper.setSubject(subject);
        mimeMessageHelper.addAttachment(file.getName(), file);
        mailSender.send(mimeMessage);
        System.out.println("Mail Send...");
    }

    public String generateIcsContent(Rezervacija rezervacija) throws ParseException {
        Date datumRezervacije = rezervacija.getDatumRezervacije();
        int id = rezervacija.getrezervacijaId();
        String vremePocetka = rezervacija.getVremePocetka();
        String vremeZavrsetka = rezervacija.getVremeZavrsetka();
        String sala = rezervacija.getSala().getSala();
        String predmet = rezervacija.getPredmet() != null ? rezervacija.getPredmet().getPredmet() : rezervacija.getDogadjaj();
        String start = formatDate(datumRezervacije, vremePocetka);
        String end = formatDate(datumRezervacije, vremeZavrsetka);

        return "BEGIN:VCALENDAR\n" +
                "VERSION:2.0\n" +
                "PRODID:-Fakultet Organizacionih Nauka\n" +
                "BEGIN:VEVENT\n" +
                "UID:" + System.currentTimeMillis() + "@yourdomain.com\n" +
                "DTSTAMP:" + formatDate(new Date()) + "\n" +
                "DTSTART:" + start + "\n" +
                "DTEND:" + end + "\n" +
                "SUMMARY:Rezervacija: " + predmet + " u sali - " + sala + "\n" +
                "DESCRIPTION:" + predmet + "\n" +
                "END:VEVENT\n" +
                "END:VCALENDAR";
    }

    private String formatDate(Date date, String vreme) throws ParseException {
        String sati = vreme.split(":")[0];
        String minuti = vreme.split(":")[1];

        SimpleDateFormat finalFormat = new SimpleDateFormat("yyyyMMdd");
        //finalFormat.setTimeZone(TimeZone.getTimeZone("UTC"));

        return finalFormat.format(date) + "T" + sati + minuti + "00Z";
    }

    private String formatDate(Date date) {
        return new SimpleDateFormat("yyyyMMdd").format(date);
    }
}
